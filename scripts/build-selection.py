"""Fase 5 independente, com observação sem pontuação de pessoas."""
import re
from pathlib import Path
root=Path(__file__).resolve().parents[1]
source=(root/'docs/fase-5-oficial.md').read_text()
def clean(body):
 body=re.sub(r'\[INSTRUÇÃO PARA [^\]]+\]\s*','',body)
 body=re.sub(r'^---\s*$|^# =+\s*$','',body,flags=re.M)
 body=re.sub(r'\bcurso(s)?\b',lambda m:'treinamentos' if m[1] else 'treinamento',body,flags=re.I)
 return re.sub(r'\n{3,}','\n\n',body).strip()
def stage(id,title,mode,body='',**extra):return {'id':id,'title':title,'kind':'phase5','blocks':[{'title':title,'body':body,'selection':mode,**extra}]}
def build():
 matches=list(re.finditer(r'^# MÓDULO (\d+)\n# (.+)\n# =+\s*$',source,re.M));modules=[]
 for i,m in enumerate(matches):
  n=i+1;end=matches[i+1].start() if i+1<len(matches) else source.index('# FERRAMENTA FINAL')
  raw=re.sub(r'^## AULA ', '# AULA ',source[m.end():end],flags=re.M)
  chunks=re.split(r'^# (.+)\s*$',raw,flags=re.M);module={'id':f'f5-m{n}','title':m[2],'intro':clean(chunks[0]),'lessons':[]};unit=None
  for j in range(1,len(chunks),2):
   title=chunks[j].strip();body=clean(chunks[j+1])
   if title.startswith('AULA '):
    ln=int(re.match(r'AULA (\d+)',title)[1]);unit={'id':f'f5-m{n}-a{ln}','title':title,'kind':'lesson','lessonNumber':ln,'blocks':[{'title':title,'body':body}]};module['lessons'].append(unit)
    if n==10 and ln in [7,8]:unit['blocks'].append({'title':'COMO ESTÁ — SEM PROJETO DE MUDAR ALGUÉM' if ln==7 else 'O ESPELHO DA ESCOLHA JUSTA','body':'','selection':'as-is' if ln==7 else 'reverse'})
   elif title.startswith(('FERRAMENTA —','SIMULADOR —')) and unit:unit['blocks'].append({'title':title,'body':'','selection':title})
   elif title=='MISSÃO':
    label={1:'O QUE VALORIZO E O QUE OFEREÇO',2:'FATOS, NÃO FANTASIAS',4:'MINHA PRÓPRIA PRESENÇA DIGITAL'}[n];unit={'id':f'f5-m{n}-challenge','title':label,'kind':'challenge','blocks':[{'title':label,'body':body,'selection':'module-challenge','module':n}]};module['lessons'].append(unit)
   elif title.startswith('AVALIAÇÃO DO MÓDULO'):
    count=25 if n in [2,7,8,9] else 20;unit={'id':f'f5-m{n}-exam','title':title,'kind':'exam','blocks':[{'title':title,'body':f'{count} situações para distinguir comportamento, contexto e compatibilidade. Aprovação a partir de 70%.','selection':'module-exam','module':n}]};module['lessons'].append(unit)
   elif title.startswith('SINAIS '):module['intro']+='\n\n### '+title+'\n\n'+body
   elif title=='O NAMORO.' and unit:unit['blocks'][0]['body']+='\n\n### '+title+'\n\n'+body
  if n==10:module['lessons'].append({'id':'f5-m10-campaign','title':'30 DIAS DE DISCERNIMENTO','kind':'challenge','blocks':[{'title':'30 DIAS DE DISCERNIMENTO','body':'Pratique com cenários fictícios mesmo se não estiver conhecendo alguém. Separe atração de caráter, observe padrões, reflita sobre compatibilidade e decida sem pressa. Não crie armadilhas ou investigue informações privadas.','selection':'campaign'}]})
  modules.append(module)
 opening=source[source.index('# PRINCÍPIO CENTRAL DA FASE 5'):source.index('# DIAGNÓSTICO DE ENTRADA')]
 contract=source[source.index('# CONTRATO DO DISCERNIMENTO'):source.index('# INICIAR O DISCERNIMENTO')].split('\n',1)[1].replace('Botão:','')
 code=source[source.index('## 1. NÃO ESCOLHEREI'):source.index('# BOTÃO')]
 ending=source[source.index('# VOCÊ APRENDEU A OLHAR'):source.index('# INSTRUÇÕES DEFINITIVAS')]
 passages=['DEFINA O QUE REALMENTE VALORIZA','FATOS, NÃO FANTASIAS','ENTENDA RECIPROCIDADE','REVISE SUA PRÓPRIA PRESENÇA DIGITAL','DEFINA SEU ESTILO DE VIDA INEGOCIÁVEL','MAPEIE SUA PRÓPRIA INFLUÊNCIA FAMILIAR','ABANDONE O PAPEL DE SALVADOR','DEFINA CINCO COMPATIBILIDADES CENTRAIS','VERDE, AMARELO, VERMELHO OU INFORMAÇÃO INSUFICIENTE']
 return {'id':'fase-5','title':'A Escolha','subtitle':'Discernimento • Caráter • Compatibilidade • Observação','revision':1,'opening':clean(re.sub(r'^# ','## ',clean(opening),flags=re.M)),'modules':modules,'before':[stage('f5-entrada','ÍNDICE DE DISCERNIMENTO','diagnostic','50 afirmações sobre sua própria capacidade de observar e decidir. O índice não avalia o valor de outra pessoa.'),stage('f5-contrato','CONTRATO DO DISCERNIMENTO','contract',clean(contract))],'passages':[stage(f'f5-passagem-{i}',title,'passage','Aplique o mesmo padrão a si. Utilize fatos e situações seguras; não crie testes artificiais.',passage=i) for i,title in enumerate(passages,1)],'after':[stage('f5-prova','PROVA FINAL DA FASE 5','final-exam','60 situações distribuídas pelos dez módulos. Aprovação a partir de 70%.'),stage('f5-laboratorio','O LABORATÓRIO DA ESCOLHA','laboratory','Quatro perfis inteiramente fictícios. Observe informações graduais e explique seu raciocínio, sem tratar aparência, origem ou história como sentença.'),stage('f5-saida','DIAGNÓSTICO FINAL — DISCERNIMENTO','exit','Compare suas respostas atuais com o ponto de partida preservado.'),stage('f5-dossie','DOSSIÊ DE DISCERNIMENTO','dossier','O QUE EU REALMENTE SEI — E O QUE ESTOU APENAS IMAGINANDO?'),stage('f5-codigo','CÓDIGO DA ESCOLHA','code',clean(code))],'ending':clean(re.sub(r'^# ','## ',clean(ending),flags=re.M))}
