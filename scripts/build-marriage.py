"""Compila a Fase 7 sem alterar as aulas ou IDs das fases anteriores."""
import re
from pathlib import Path
root=Path(__file__).resolve().parents[1]
source=(root/'docs/fase-7-oficial.md').read_text()
def clean(body):
 body=re.sub(r'\[INSTRUÇÃO PARA [^\]]+\]\s*','',body)
 body=re.sub(r'^---\s*$|^# =+\s*$','',body,flags=re.M)
 body=re.sub(r'\bcurso(s)?\b',lambda m:'treinamentos' if m[1] else 'treinamento',body,flags=re.I)
 return re.sub(r'\n{3,}','\n\n',body).strip()
def section(start,end):return clean(source[source.index(start)+len(start):source.index(end)])
def stage(id,title,mode,body='',**extra):return {'id':id,'title':title,'kind':'phase7','blocks':[{'title':title,'body':body,'marriage':mode,**extra}]}
def build():
 matches=list(re.finditer(r'^# MÓDULO (\d+)\n((?:# (?![=])[^\n]+\n)+)# =+\s*$',source,re.M));modules=[]
 for i,m in enumerate(matches):
  n=i+1;end=matches[i+1].start() if i+1<len(matches) else source.index('# MISSÕES DE PASSAGEM')
  chunks=re.split(r'^#{1,2} (.+)\s*$',source[m.end():end],flags=re.M)
  module={'id':f'f7-m{n}','title':' — '.join(line[2:] for line in m[2].strip().splitlines()),'intro':clean(chunks[0]),'lessons':[]};unit=None
  for j in range(1,len(chunks),2):
   title=chunks[j].strip();body=clean(chunks[j+1])
   if title.startswith('AULA '):
    ln=int(re.match(r'AULA (\d+)',title)[1]);unit={'id':f'f7-m{n}-a{ln}','title':title,'kind':'lesson','lessonNumber':ln,'blocks':[{'title':title,'body':body}]};module['lessons'].append(unit)
    if n==1 and ln==10:unit['blocks']=[{'title':title,'body':'Escreva sua visão de aliança e os compromissos que deseja praticar.'},{'title':'CARTA DA ALIANÇA','body':'','marriage':'CARTA DA ALIANÇA'}]
   elif title.startswith(('FERRAMENTA —','SIMULADOR —')) and unit:unit['blocks'].append({'title':title,'body':'','marriage':title})
   elif title.startswith('MISSÃO —'):
    unit={'id':f'f7-m{n}-challenge','title':title,'kind':'challenge','blocks':[{'title':title,'body':body,'marriage':'module-challenge','module':n}]};module['lessons'].append(unit)
   elif title.startswith('AVALIAÇÃO DO MÓDULO'):
    count=20 if n in [4,5,10,12,14,16] else 25;unit={'id':f'f7-m{n}-exam','title':title,'kind':'exam','blocks':[{'title':title,'body':f'{count} questões práticas. Aprovação a partir de 70%.','marriage':'module-exam','module':n}]};module['lessons'].append(unit)
   elif title in ['OBJETIVO','PRINCÍPIO','POSICIONAMENTO']:module['intro']+='\n\n## '+title+'\n\n'+body
  modules.append(module)
 passages=[]
 passageText=section('# MISSÕES DE PASSAGEM','# CENTRAL DO CASAMENTO')
 for i,m in enumerate(re.finditer(r'^### MISSÃO — (.+)\n([\s\S]*?)(?=^## M|\Z)',passageText,re.M),1):passages.append(stage(f'f7-passagem-{i}',m[1],'passage',clean(m[2]),passage=i))
 optional=[stage(f'f7-teste-{i}',title,'special',test=i) for i,title in enumerate(['LIDERANÇA OU CONTROLE?','SERVIÇO OU PASSIVIDADE?','SUBMISSÃO BÍBLICA OU DOMINAÇÃO?','PROVISÃO OU OSTENTAÇÃO?','SEXUALIDADE SAUDÁVEL OU PODER?','CONFLITO OU ABUSO?','FAMÍLIA OU INTERFERÊNCIA?','APOIO OU SALVAMENTO?','PERDÃO OU PASSAR PANO?','ALIANÇA OU DEPENDÊNCIA?'],1)]
 return {'id':'fase-7','title':'O Casamento','subtitle':'Aliança • Liderança • Companheirismo • Família • Legado','revision':1,'opening':section('# POSICIONAMENTO DA FASE','# DIAGNÓSTICO DE ENTRADA'),'modules':modules,'before':[stage('f7-entrada','ÍNDICE DE PRONTIDÃO E MATURIDADE CONJUGAL','diagnostic','75 afirmações sobre sua prática em quinze áreas. Autoavaliação educativa, sem diagnóstico clínico.'),stage('f7-contrato','CONTRATO DA ALIANÇA','contract',section('# CONTRATO DA ALIANÇA','# ASSUMO A RESPONSABILIDADE DA ALIANÇA').replace('Apresentar antes do Módulo 1:','').replace('Botão:',''))],'passages':passages,'optional':optional,'after':[stage('f7-campanha','90 DIAS DE ALIANÇA','campaign','Experiência prática integrada, disponível durante a fase. Complete o período e as seis revisões para concluir a preparação para a prova.'),stage('f7-prova','PROVA FINAL DA FASE 7','final-exam','117 questões: a soma da distribuição solicitada nos dezesseis temas. Aprovação a partir de 70%.'),stage('f7-laboratorio','30 ANOS EM 30 DECISÕES','laboratory','Acompanhe as estações de um casamento fictício. Suas escolhas alteram os contextos posteriores, sem diagnóstico psicológico.'),stage('f7-saida','DIAGNÓSTICO FINAL — MATURIDADE CONJUGAL','exit'),stage('f7-dossie','DOSSIÊ DO MARIDO','dossier','O HOMEM QUE LIDERA, SERVE E PROTEGE A ALIANÇA'),stage('f7-codigo','CÓDIGO DO MARIDO','code',section('Apresentar antes do encerramento:','# ASSUMO O CÓDIGO DO MARIDO').replace('Botão:',''))],'ending':'## CASAMENTO NÃO É O FIM DA FORJA.\n\n'+section('# CASAMENTO NÃO É O FIM DA FORJA.','# INSTRUÇÕES DEFINITIVAS PARA GPT ASTRA')}
