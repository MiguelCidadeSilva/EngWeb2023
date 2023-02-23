 # TPC usar o dataset do tp1
 # /localhost:porta/
 #           -> index.html:
 #              lista ordenada de distritos
 #                  Aveiro
 #                  lista ordenada de cidades (links -> pagina html da cidade)
 # 
 # localhost:porta/id da cidade
 # localhost:porta/cs:
 #          -cx.html (info da cidade )
 # 

import json
import collections

def ordCidade(cidade):
    return cidade['nome']

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


#quero criar uma estrutura {distrito(ornados),[lista ordenada de cidades]}
# vou começar por criar um dicionario ordenado nos distritos {distrito,[id,cidade]}
def distritoCidades(cidades):
    dicionario = {}
    for c in cidades:
        if not dicionario.__contains__(c['distrito']):
            dicionario[c['distrito']] = []
            dicionario[c['distrito']].append((c['id'],c['nome']))
        else: 
            dicionario[c['distrito']].append((c['id'],c['nome']))
    return collections.OrderedDict(sorted(dicionario.items()))

#agora ordeno as cidades
d = distritoCidades(cidades)
d_ordenado = {}
for chave, lista in d.items():
    d_ordenado[chave] = sorted(lista, key=lambda x: x[1])


#print(d_ordenado)

basePagina = """
<!DOCTYPE html>
<html>
    <head>
    <title>Mapa Virtual</title>
    <meta charset="UTF-8"/>

    </head>

    </html>
    
    <body>"""


def geraindice():
    indexHTML = basePagina
    for distrito in d_ordenado:
        indexHTML+= f"""
            <p>
            {distrito}
                <ul>
        """
        for cidade in d_ordenado[distrito]:
                indexHTML+=f"""
                <li><a href='/{cidade[0]}'>{cidade[1]}</a></li>""" 
        indexHTML+="""
                </ul>
            </p>"""
        
    indexHTML+="""</body>
    </html>
        """
    with open("paginasweb/index.html","w") as f:
        f.write(indexHTML)

#geraindice()

def gerapaginascidade(c):
    pagHTML = basePagina
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
    ficheiro = "paginasweb/"+c['id']+".html"
    with open(ficheiro,"w") as f:
        f.write(pagHTML)

geraindice()
for c in cidades:
    gerapaginascidade(c)