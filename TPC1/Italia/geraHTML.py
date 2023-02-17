import csv

def read_csv_file(filename):
    data = []
    with open(filename, 'r',encoding="utf8") as csv_file:
        csv_reader = csv.DictReader(csv_file)
        for row in csv_reader:
            data.append(row)
            #print(data)
    return data

cidades = read_csv_file("datasets/cidades.csv")
monumentos = read_csv_file("datasets/monumentos.csv")
pratos = read_csv_file("datasets/pratos.csv")

paginaHTML = """
<!DOCTYPE html>
<html>
    <head>
        <title>Sobre a Itália</title>
        <meta charset="UTF-8"/>
    </head>
    <body>
        <h1>Informação relevante sobre a Itália</h1>
        <table>
        <td width="30%" valign="top">
            <h2>Índice</h2>
            <ul>
                <li><a href="#intro">Introdução</a></li>
                <li><a href="#cidades">Cidades a visitar</a></li>
                <li><a href="#monumentos">Monumentos a conhecer</a></li>
                <li><a href="#pratos">Pratos a degustar</a></li>
            </ul>
        </td>
        <td width="70%">
            <a name="intro"></a>
            <p>
            A Itália é um dos países mais visitados em todo o mundo. A sua história é bela, pasando por períodos como o império romano e o renascimento até aos dias de hoje.
            Tal como Portugal, a Itália é um país da Europa de Sul. A sua lingua oficial é o italiano.
            Nesta página serão apresentadas sugestões de cidades, monumentos e comida, para visitar e experimentar em solo italiano.
            Esta página é bastante simples e não conta com muitos exemplos, no entanto, estamos abertos sempre a novas sugestões. 
            </p>
            <a name="cidades"></a>
            <h2>Lista de cidades Italianas a Visitar</h2>
            <p>
                Eis algumas recomendações de cidades a visitar:
            </p>
            <ul>
            """
for c in cidades:
    nome = c['Cidade']
    paginaHTML+=f"""<li><a href="#{nome}">{nome}</a></li>"""

paginaHTML+="""
            </ul>
            <hr>
            """

for cidade in cidades:
    nomecidade = cidade['Cidade']
    regiao = cidade['Região']
    populacao = cidade['População']
    altitude = cidade['Altitude (m)']
    paginaHTML+= f"""
            <p>
                <a name="{nomecidade}"></a>
                <h3>{nomecidade}</h3>
                <p>Região: {regiao}</p>
                <p>População: {populacao}</p>
                <p>Altitude (m): {altitude}</p>
                <hr>
            </p>
    """
paginaHTML+="""
            <a name="monumentos"></a>
            <h2>Lista de monumentos a Visitar</h2>
            <p>
                Um pais como a Itália conta com diversos monumentos, listamos algumas recomendações que valem a pena conhecer.
                No entanto é de salientar que alguns destes monumentos não são localizados no país, tendo sido construidos pelo império romano noutras regiões, no entanto são marcáveis as características arquitetónicas destes edifícios:
            </p>
            <ul>
            """
for m in monumentos:
    name = m['Monumento']            
    paginaHTML+=f"""<li><a href="#{name}">{name}</a></li>"""

paginaHTML+="""
            </ul>
            <hr>
            """ 

for monumento in monumentos:
    nomeMonumento = monumento['Monumento']
    cidadeMon = monumento['Cidade']
    ac = monumento['Ano de Construção']
    altura = monumento['Altura (m)']
    paginaHTML+=f"""
            <p>
                <a name="{nomeMonumento}"></a>
                <h3>{nomeMonumento}</h3>
                <p>Cidade: {cidadeMon}</p>
                <p>Ano de Construção: {ac}</p>
                <p>Altura (m): {altura}</p>
                <center>
                    <hr>
                </center>
            </p>
    """
paginaHTML+="""
            <a name="pratos"></a>
            <h2>Lista de pratos a degustar</h2>
            <p>
                Com tanta coisa para ver e descobrir neste belo país, não nos podemos esquecer da gastronomia, sendo a culinária italiana reconhecida mundialmente pela sua qualidade e inovação.
                Em todos os paises podemos encontrar comida de origem italiana, ou versões basiadas naquilo que surgiu nesta península, no entanto, nada melhor do que experimentar os produtos originais!
                    Nesta secção apresentaremos alguns pratos tradicionais de itália, mostrando o seu local de origem e descricões informativas.
                </p>
                <ul>
                """
for p in pratos:
    nomep = p['Prato']
    paginaHTML+=f"""<li><a href="#{nomep}">{nomep}</a></li>"""

paginaHTML+="""
                </ul>
                <hr>
                """

for prato in pratos:
    nomePrato = prato['Prato']
    regiaop = prato['Região']
    descricao = prato['Descrição']
    paginaHTML+=f""" 
                <p>
                    <a name="{nomePrato}"></a>
                    <h3>{nomePrato}</h3>
                    <p>Região: {regiaop}</p>
                    <p>Descricão: {descricao}</p>
                    <hr>
                </p>
    """
paginaHTML+="""
            </td>
        </table>
    </body>
</html>
"""
print(paginaHTML)