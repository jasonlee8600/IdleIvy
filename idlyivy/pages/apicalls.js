

export async function getUser (adr)
{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'address': adr})
    };
    
    const response = await fetch('http://localhost:3001/checkUser', requestOptions);
    const json = await response.json();

    return json;

}

export async function newUser (adr, nick)
{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({'nickname' : nick, 'address' : adr})
    };
    
    const response = await fetch('http://localhost:3001/newUser', requestOptions);
    const json = await response.json();

    console.log(json);

}

export async function updateUser (adr, rate)
{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({'rate' : rate, 'address' : adr})
    };
    
    const response = await fetch('http://localhost:3001/updateUser', requestOptions);
    const json = await response.json();

    console.log(json);
}
