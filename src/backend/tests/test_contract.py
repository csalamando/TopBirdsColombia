from pathlib import Path
import schemathesis
from app.main import app

schema = schemathesis.from_dict(app.openapi(), force_schema_version="30")

_spec_path = Path(__file__).resolve().parent.parent.parent.parent / "spec" / "api-contract.yaml"
spec_schema = schemathesis.from_path(str(_spec_path))


@schema.parametrize(endpoint="/health")
def test_health_contract(case):
    response = case.call_asgi(app)
    case.validate_response(response)


@schema.parametrize(endpoint="/aves")
def test_aves_list_contract(case):
    response = case.call_asgi(app)
    case.validate_response(response)


@schema.parametrize(endpoint="/partidas")
def test_partidas_contract(case):
    response = case.call_asgi(app)
    case.validate_response(response)


@spec_schema.parametrize()
def test_api_contract_from_spec(case):
    response = case.call_asgi(app)
    case.validate_response(response)
