"""Compila a Fase II separadamente, mantendo a ordem e as aulas do documento oficial."""
import re
from pathlib import Path
root=Path(__file__).resolve().parents[1]
source=(root/'docs/fase-2-oficial.md').read_text()
def clean(body):
 body=re.sub(r'\[INSTRUÇÃO PARA [^\]]+\]\s*','',body)
 body=re.sub(r'^---\s*$','',body,flags=re.M)
 body=re.sub(r'\bcurso(s)?\b',lambda m:'treinamentos' if m[1] else 'treinamento',body,flags=re.I)
 for old,new in [('Ensinar princípios gerais:','Princípios gerais:'),('Ensinar conceitos gerais:','Conceitos gerais:'),('Introduzir princípios:','Princípios:'),('Ensinar:','Pratique:'),('Ensinar blocos de concentração.','Use blocos de concentração.'),('Trabalhar:','Pratique:'),('Criar três categorias.','Observe três categorias.'),('Definir sete pilares:','Observe sete pilares:'),('Não criar regras caricatas.','Presença não exige regras caricatas.'),('Não transformar o módulo em dieta específica.','Não há uma dieta universal neste módulo.'),('Evitar pseudociência e dietas universais.','Evite pseudociência e dietas universais.'),('O aluno definirá:','Você definirá:')]:body=body.replace(old,new)
 return re.sub(r'\n{3,}','\n\n',body).strip()
def stage(id,title,mode,body='',**extra):return {'id':id,'title':title,'kind':'phase2','blocks':[{'title':title,'body':body,'consolidation':mode,**extra}]}
def build():
 matches=list(re.finditer(r'^# MÓDULO (\d+)\n# (.+)\n# =+\s*$',source,re.M));modules=[]
 for i,m in enumerate(matches):
  n=i+1;end=matches[i+1].start() if i+1<len(matches) else source.index('# MISSÕES DE PASSAGEM ENTRE MÓDULOS')
  body=source[m.end():end];chunks=re.split(r'^# (.+)\s*$',body,flags=re.M)
  module={'id':f'f2-m{n}','title':m[2],'intro':clean(chunks[0]),'lessons':[]};unit=None
  for j in range(1,len(chunks),2):
   title=chunks[j].strip();text=clean(chunks[j+1])
   if title.startswith('AULA '):
    ln=int(re.match(r'AULA (\d+)',title)[1]);unit={'id':f'f2-m{n}-a{ln}','title':title,'kind':'lesson','lessonNumber':ln,'blocks':[{'title':title,'body':text}]};module['lessons'].append(unit)
    if n==1 and ln==12:
     unit['blocks'][0]['body']='Reúna sua rotina em um sistema executável: horários de acordar e dormir, três prioridades, mínimos, revisão semanal, plano SE/ENTÃO e regras contra distração.'
     unit['blocks'].append({'title':'SISTEMA PESSOAL DE EXECUÇÃO','body':'','consolidation':'execution-system'})
    if n==7 and ln in [7,8,9]:unit['blocks'].append({'title':f'CHECKPOINT DE {30*(ln-6)} DIAS','body':'','consolidation':'checkpoint','day':30*(ln-6)})
   elif title.startswith(('FERRAMENTA —','SIMULADOR —','TREINADOR DE ASSERTIVIDADE')) and unit:
    unit['blocks'].append({'title':title,'body':'','consolidation':title})
   elif title.startswith('DESAFIO'):
    label='DESAFIO — 30 DIAS DE CONSOLIDAÇÃO TOTAL' if n==7 else title
    unit={'id':f'f2-m{n}-challenge','title':label,'kind':'challenge','blocks':[{'title':label,'body':'Registre ações realmente executadas. Em dias difíceis, utilize o mínimo ou a manutenção planejada.','consolidation':'module-challenge','module':n}]};module['lessons'].append(unit)
   elif title.startswith('AVALIAÇÃO DO MÓDULO'):
    unit={'id':f'f2-m{n}-exam','title':title,'kind':'exam','blocks':[{'title':title,'body':'Situações práticas. Aprovação a partir de 70%. Revise o raciocínio após cada resposta.','consolidation':'module-exam','module':n}]};module['lessons'].append(unit)
   elif title in ['REGRA','REGRA 1–2','MISSÃO 90 DIAS — ESTRUTURA'] and unit:unit['blocks'].append({'title':title,'body':text})
  modules.append(module)
 opening=source[source.index('# ABERTURA DA FASE II'):source.index('# DIAGNÓSTICO DE ENTRADA')]
 contract=source[source.index('# CONTRATO DA CONSOLIDAÇÃO'):source.index('# ENTRAR NA CONSOLIDAÇÃO')].split('Antes de entrar no Módulo 1:',1)[1].replace('Botão:','')
 ending=source[source.index('# A CONSOLIDAÇÃO FOI CONCLUÍDA'):source.index('# INSTRUÇÕES DEFINITIVAS')].replace('Texto:','')
 opening=clean(re.sub(r'^# ','## ',opening,flags=re.M));ending=clean(re.sub(r'^# ','## ',ending,flags=re.M));ending=re.sub(r'^## =+\s*$','',ending,flags=re.M)
 passages=[('7 DIAS DE EXECUÇÃO','Cumpra seus mínimos pessoais durante sete dias.','passage-days',7),('CORPO SOB COMANDO','Cumpra uma semana organizada de movimento, sono e apresentação.','passage-days',7),('PRODUZA VALOR','Entregue algo real no trabalho ou estudo.','passage',0),('ENCARE SEUS NÚMEROS','Revise seu Raio-X Financeiro completo e registre o que aprendeu.','financial-passage',0),('UMA CONVERSA QUE VOCÊ ESTAVA EVITANDO','Realize uma conversa assertiva e segura. Registre apenas o aprendizado, sem informações privadas.','passage',0),('REORGANIZE O CAMPO','Elimine uma influência negativa e fortaleça uma positiva.','passage',0)]
 return {'id':'fase-2','title':'A Consolidação','subtitle':'Do conhecimento ao padrão de vida','revision':1,'opening':opening,'modules':modules,'before':[stage('f2-entrada','ÍNDICE DE CONSOLIDAÇÃO','diagnostic','Observe sua rotina recente. Este é um retrato de suas respostas, não uma medida de valor pessoal.'),stage('f2-contrato','CONTRATO DA CONSOLIDAÇÃO','contract',clean(contract))],'passages':[stage(f'f2-passagem-{i}',title,mode,body,days=days,passage=i) for i,(title,body,mode,days) in enumerate(passages,1)],'after':[stage('f2-prova','PROVA FINAL — FASE II','final-exam','40 situações e decisões para integrar os sete módulos. Aprovação: 70%.'),stage('f2-saida','DIAGNÓSTICO DE SAÍDA','exit','Responda às mesmas afirmações de entrada para comparar suas respostas atuais.'),stage('f2-dossie','DOSSIÊ DA CONSOLIDAÇÃO','dossier','O QUE VOCÊ TRANSFORMOU EM SISTEMA')],'ending':ending}
