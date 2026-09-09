#!/usr/bin/env python3
"""traceability_matrix.py — matriz historia -> Gherkin -> test -> código.

Uso: python3 traceability_matrix.py --spec-dir spec/ --tests-dir tests/ --src-dir src/
Detecta historias sin tests y código sin historia (huérfano). Exit 1 si hay brechas.
"""
import os, re, argparse, sys

# Windows: la consola cp1252 no codifica checkmarks; forzar UTF-8 cuando sea posible.
try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
except (AttributeError, OSError):
    pass

def collect_ids(root, exts):
    ids = set()
    if os.path.isfile(root):
        text = open(root, encoding="utf-8", errors="ignore").read()
        return {i.upper() for i in re.findall(r"HU-\d+", text, re.IGNORECASE)}
    if not os.path.isdir(root):
        return ids
    for dirpath, _, files in os.walk(root):
        for f in files:
            if any(f.endswith(e) for e in exts):
                try:
                    text = open(os.path.join(dirpath, f), encoding="utf-8", errors="ignore").read()
                except OSError:
                    continue
                ids.update(re.findall(r"HU-\d+", text, re.IGNORECASE))
    return {i.upper() for i in ids}

# Convención de NOMBRE de archivo de test: vitest/jest (*.test.*, *.spec.*),
# pytest (test_*.py), go (_test.go). `test.`/`spec.` deben ir tras un punto o
# al inicio del nombre ("contest.py" o "prospect.ts" no son tests).
TEST_NAME_PAT = re.compile(r"(?:\.|^)(?:test|spec)\.[^.]+$|^test_.*\.py$|_test\.go$")

# Directorios que nunca se recorren al buscar evidencia de test en src/.
_PRUNE_DIRS = ("node_modules", ".git", "dist", "build", "__pycache__", ".next")

def collect_test_ids(root, exts):
    """Ids HU en ARCHIVOS DE TEST identificados por nombre (*.test.*, test_*.py).

    A diferencia de collect_ids (cualquier archivo con la extensión dada), solo
    cuenta archivos que siguen la convención de test: permite usar directorios
    de fuente (src/) como evidencia de test sin contar código de aplicación.
    """
    ids = set()
    if not os.path.isdir(root):
        return ids
    for dirpath, dirs, files in os.walk(root):
        dirs[:] = [d for d in dirs if d not in _PRUNE_DIRS]
        for f in files:
            if not any(f.endswith(e) for e in exts):
                continue
            if not TEST_NAME_PAT.search(f):
                continue
            try:
                text = open(os.path.join(dirpath, f), encoding="utf-8", errors="ignore").read()
            except OSError:
                continue
            ids.update(re.findall(r"HU-\d+", text, re.IGNORECASE))
    return {i.upper() for i in ids}

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--spec-dir", default="spec/")
    ap.add_argument("--tests-dir", default="tests/")
    ap.add_argument("--src-dir", default="src/")
    a = ap.parse_args()
    stories = collect_ids(os.path.join(a.spec_dir, "user-stories.md") if os.path.isfile(os.path.join(a.spec_dir, "user-stories.md")) else a.spec_dir, [".md"])
    tests = collect_ids(a.tests_dir, [".py", ".ts", ".tsx", ".js", ".java", ".cs", ".feature"])
    # Tests unitarios junto al código (src/**/*.test.*, src/**/test_*.py):
    # misma evidencia que usa el dashboard (derive_project de harness_graph).
    tests |= collect_test_ids(a.src_dir, [".py", ".ts", ".tsx", ".js", ".java", ".cs", ".feature"])
    code  = collect_ids(a.src_dir, [".py", ".ts", ".tsx", ".js", ".java", ".cs"])
    print("| Historia | Gherkin (spec) | Test | Código |")
    print("|---|---|---|---|")
    gaps = 0
    for hu in sorted(stories | tests | code):
        s, t, c = hu in stories, hu in tests, hu in code
        print(f"| {hu} | {'✓' if s else '—'} | {'✓' if t else '✗'} | {'✓' if c else '✗'} |")
        if s and (not t or not c): gaps += 1
        if (t or c) and not s: gaps += 1  # código/test huérfano
    print(f"\nHistorias: {len(stories)} | con test: {len(stories & tests)} | con código: {len(stories & code)}")
    if gaps:
        print(f"BRECHAS: {gaps} filas incompletas (historias sin test/código o código huérfano).")
        sys.exit(1)
    print("Trazabilidad completa.")

if __name__ == "__main__":
    main()
