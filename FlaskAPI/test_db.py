from server import app
import pytest

#basic tests for API endpoints - don't work with actually querying the database

def test_checkUser():
    with app.test_client() as client:
        data = {'address': '0x53Cc9574e39E3b4c423ff070C128ee0d5fFf8606'}
        response = client.post('/checkUser', json=data)
        assert response.status_code == 200


def test_newUser():
    with app.test_client() as client:
        data = {'address': '0x53Cc9574e39E3b4c423ff070C128ee0d5fFf8606', 'nickname' : 'testname'}
        response = client.post('/newUser', json=data)
        assert response.status_code == 200



def test_updateUser():
    with app.test_client() as client:
        data = {'address': '0x53Cc9574e39E3b4c423ff070C128ee0d5fFf8606', 'rate' : '1337'}
        response = client.post('/updateUser', json=data)
        assert response.status_code == 200


def test_getLB():
    with app.test_client() as client:
        response = client.get('/getLB')
        assert response.status_code == 200







