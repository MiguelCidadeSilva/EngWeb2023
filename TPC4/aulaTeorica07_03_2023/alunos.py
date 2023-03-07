import pandas as pd
import json

data = pd.read_csv('alunos.csv',encoding="utf8",sep = ';')

lista = []

for _,d in data.iterrows():
    dicionario = {}
    dicionario['id'] = d['id']
    dicionario['nome'] = d['nome']
    dicionario['gitlink'] = d['gitlink']
    lista.append(dicionario)

file = open('alunos.json',encoding="utf8",mode='w')
json.dump(lista,file,indent=4)
file.close()
