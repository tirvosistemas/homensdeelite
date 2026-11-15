"""Compila a Fase 6 preservando o texto das 120 aulas e as fases anteriores."""
import re
from pathlib import Path
root=Path(__file__).resolve().parents[1]
source=(root/'docs/fase-6-oficial.md').read_text()
def clean(body):
 body=re.sub(r'\[INSTRUÇÃO PARA [^\]]+\]\s*','',body)
 body=re.sub(r'^---\s*$|^# =+\s*$','',body,flags=re.M)
 body=re.sub(r'\bcurso(s)?\b',lambda m:'treinamentos' if m[1] else 'treinamento',body,flags=re.I)
 return re.sub(r'\n{3,}','\n\n',body).strip()
def section(start,end):return clean(source[source.index(start)+len(start):source.index(end)])
def stage(id,title,mode,body='',**extra):return {'id':id,'title':title,'kind':'phase6','blocks':[{'title':title,'body':body,'dating':mode,**extra}]}
def build():
 matches=list(re.finditer(r'^# MÓDULO (\d+)\n# (.+)\n# =+\s*$',source,re.M));modules=[]
 for i,m in enumerate(matches):
  n=i+1;end=matches[i+1].start() if i+1<len(matches) else source.index('# MISSÕES DE PASSAGEM ENTRE MÓDULOS')
  raw=source[m.end():end];chunks=re.split(r'^#{1,2} (.+)\s*$',raw,flags=re.M)
  module={'id':f'f6-m{n}','title':m[2],'intro':clean(chunks[0]),'lessons':[]};unit=None
  for j in range(1,len(chunks),2):
   title=chunks[j].strip();body=clean(chunks[j+1])
   if title.startswith('AULA '):
    ln=int(re.match(r'AULA (\d+)',title)[1]);unit={'id':f'f6-m{n}-a{ln}','title':title,'kind':'lesson','lessonNumber':ln,'blocks':[{'title':title,'body':body}]};module['lessons'].append(unit)
   elif title.startswith(('FERRAMENTA —','SIMULADOR —')) and unit:unit['blocks'].append({'title':title,'body':'','dating':title})
   elif title.startswith('MISSÃO —'):
    unit={'id':f'f6-m{n}-challenge','title':title,'kind':'challenge','blocks':[{'title':title,'body':body,'dating':'module-challenge','module':n}]};module['lessons'].append(unit)
   elif title.startswith('AVALIAÇÃO DO MÓDULO'):
    count=20 if n in [1,7,8,10] else 25;unit={'id':f'f6-m{n}-exam','title':title,'kind':'exam','blocks':[{'title':title,'body':f'{count} questões práticas. Aprovação a partir de 70%.','dating':'module-exam','module':n}]};module['lessons'].append(unit)
   elif title in ['OBJETIVO','PRINCÍPIO','POSICIONAMENTO']:module['intro']+='\n\n## '+title+'\n\n'+body
  modules.append(module)
 passages=[]
 passageText=section('# MISSÕES DE PASSAGEM ENTRE MÓDULOS','# FERRAMENTAS TRANSVERSAIS DA FASE 6')
 for i,m in enumerate(re.finditer(r'^### MISSÃO — (.+)\n([\s\S]*?)(?=^## M|\Z)',passageText,re.M),1):passages.append(stage(f'f6-passagem-{i}',m[1],'passage',clean(m[2]),passage=i))
 optional=[stage('f6-central-checkin','CHECK-IN SEMANAL','checkin'),stage('f6-campanha','60 DIAS DE NAMORO CONSCIENTE','campaign','Campanha opcional. Não bloqueia módulos, prova ou conclusão. Registre práticas reais, sem criar conflitos para preencher o painel.')]
 for i,title in enumerate(['VOCÊ ESTÁ NAMORANDO OU SE ABANDONANDO?','CONFIANÇA OU VIGILÂNCIA?','LIMITE OU CONTROLE?','CONFLITO OU ABUSO?','FAMÍLIA OU INTERFERÊNCIA?','RECIPROCIDADE REAL','É PROBLEMA OU INCOMPATIBILIDADE?'],1):optional.append(stage(f'f6-teste-{i}',title,'special',test=i))
 return {'id':'fase-6','title':'O Namoro','subtitle':'Construção • Lealdade • Limites • Conflito • Intimidade • Futuro','revision':1,'opening':section('# PRINCÍPIO CENTRAL','# DIAGNÓSTICO DE ENTRADA'),'modules':modules,'before':[stage('f6-entrada','ÍNDICE DE MATURIDADE NO NAMORO','diagnostic','60 afirmações sobre sua prática em doze áreas. Autoavaliação educativa, sem diagnóstico clínico.'),stage('f6-contrato','CONTRATO DO NAMORO','contract',section('# CONTRATO DO NAMORO','# INICIAR A FASE 6').replace('Antes do Módulo 1, apresentar:','').replace('Botão:',''))],'passages':passages,'optional':optional,'after':[stage('f6-prova','PROVA FINAL DA FASE 6','final-exam','80 questões práticas distribuídas pelos doze módulos. Aprovação a partir de 70%.'),stage('f6-laboratorio','O LABORATÓRIO DO NAMORO','laboratory','Um namoro fictício, vinte decisões e consequências de suas escolhas. O resultado descreve posturas nos cenários, sem diagnosticar personalidade.'),stage('f6-saida','DIAGNÓSTICO FINAL — MATURIDADE NO NAMORO','exit'),stage('f6-dossie','DOSSIÊ DO NAMORO','dossier','COMO ESTOU CONSTRUINDO UMA RELAÇÃO'),stage('f6-codigo','CÓDIGO DO NAMORO','code',section('Antes da conclusão, apresentar:','# ASSUMO O CÓDIGO DO NAMORO').replace('Botão:',''))],'ending':section('# NAMORAR É FÁCIL.','# INSTRUÇÕES DEFINITIVAS PARA GPT ASTRA')}
