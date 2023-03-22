import json
import requests

file = open('dataset-extra1.json')
dados = json.load(file)
file.close()

pessoas = dados['pessoas']

print(pessoas[1])

for pessoa in pessoas:
    if 'CC' in pessoa.keys():
        pessoa['_id'] = pessoa['CC']
        del pessoa['CC']
    else:
        pessoa['_id'] = pessoa['BI']
        del pessoa['BI']
    if 'descrição' in pessoa.keys():
        pessoa['descricao'] = pessoa['descrição']
        del pessoa['descrição']
    response = requests.post('http://localhost:7777/pessoas',json = pessoa)
    print(f"Pessoa com id={pessoa['_id']} adicionada")
