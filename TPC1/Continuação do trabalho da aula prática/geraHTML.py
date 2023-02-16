import json

def ordCidade(cidade):
    return cidade['nome']

def ordLigacoes(ligacao):
    return ligacao['origem']

f = open("mapa.json",encoding="utf8")
mapa = json.load(f)
cidades = mapa['cidades']
cidades.sort(key=ordCidade)
ligacoes = mapa['ligações']
#ligacoes é uma lista de dicionarios

idnomes = {}
for c in cidades:
    id = c['id']
    idnomes[id] = c['nome']

#quero criar uma estrutura que tenha {id da origem, [destino, distancia]}
odd = {}
for idl in ligacoes:
    key = idl['origem']
    if not odd.__contains__(key):
      odd[key] = {}
    odd[key][idl['destino']] = idl['distância']

pagHTML = """
<!DOCTYPE html>
<html>
    <head>
    <title>Mapa Virtual</title>
    <meta charset="UTF-8"/>

    </head>

    </html>
    
    <body>
        <h1>Mapa Virtual</h1>
        <table>
            <tr>
                <!--coluna indice-->
                <td width = 30% valign = top>
                    <h3>Índice</h3>
                    <ol>
"""
for c in cidades:
    pagHTML+= f"<li><a href='#{c['id']}'>{c['nome']}</a></li>"

pagHTML+= """
</ol>
                </td>
                <!--coluna conteudo-->
                <td width = 70%>
                """

for c in cidades:
    pagHTML+= f"""
                    <a name = "{c['id']}"></a>
                    <h3>{c['nome']}</h3>
                    <p><b>Distrido:</b> {c['distrito']}</p>
                    <p><b>População:</b> {c['população']}</p>
                    <p><b>Descrição:</b> {c['descrição']}</p>
                    <h4>Ligações:</h4>"""
    if odd.__contains__(c['id']):
        d = odd.get(c['id']) #dicionario de dentro ou seja dicionario {destino:distancia} da cidade
        for nomeDestino, Distancia in d.items(): #cada associação
            pagHTML+= f"<li><a href='#{d}'>{idnomes.get(nomeDestino)}</a>, Distância = {Distancia}</li>"

pagHTML+="""
                    <adress>[<a href="#indice">Voltar ao índice</a>]</adress>
                    <center>
                        <hr width = "80%"/>
                    </center>
    """

pagHTML += """
                </td>
            </tr>
        </table>
    </body>
</html>
"""
print(pagHTML)