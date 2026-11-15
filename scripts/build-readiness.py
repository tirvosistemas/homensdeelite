"""Fase 4 independente: conteúdo original preservado no arquivo oficial."""
import re
from pathlib import Path
root=Path(__file__).resolve().parents[1]
source=(root/'docs/fase-4-oficial.md').read_text()
def clean(body):
 body=re.sub(r'\[INSTRUÇÃO PARA [^\]]+\]\s*','',body)
 body=re.sub(r'^---\s*$|^# =+\s*$','',body,flags=re.M)
 body=re.sub(r'\bcurso(s)?\b',lambda m:'treinamentos' if m[1] else 'treinamento',body,flags=re.I)
 return re.sub(r'\n{3,}','\n\n',body).strip()
def stage(id,title,mode,body='',**extra):return {'id':id,'title':title,'kind':'phase4','blocks':[{'title':title,'body':body,'readiness':mode,**extra}]}
def build():
 matches=list(re.finditer(r'^# MÓDULO (\d+)\n# (.+)\n# =+\s*$',source,re.M));modules=[]
 missionNames=['7 DIAS SEM PRESSA','ENCERRAMENTO DO QUE PRECISA SER ENCERRADO','7 DIAS OBSERVANDO SEM OBEDECER','UMA CONVERSA VERDADEIRA','PROTEJA SUA IDENTIDADE','ARRUME A CASA','DEFINA ANTES DO IMPULSO','7 DIAS DE HABILIDADE RELACIONAL','DEFINA SUA DIREÇÃO']
 for i,m in enumerate(matches):
  n=i+1;end=matches[i+1].start() if i+1<len(matches) else source.index('# FERRAMENTA FINAL')
  chunks=re.split(r'^# (.+)\s*$',source[m.end():end],flags=re.M);module={'id':f'f4-m{n}','title':m[2],'intro':clean(chunks[0]),'lessons':[]};unit=None
  for j in range(1,len(chunks),2):
   title=chunks[j].strip();body=clean(chunks[j+1])
   if title.startswith('AULA '):
    ln=int(re.match(r'AULA (\d+)',title)[1]);unit={'id':f'f4-m{n}-a{ln}','title':title,'kind':'lesson','lessonNumber':ln,'blocks':[{'title':title,'body':body}]};module['lessons'].append(unit)
   elif title.startswith(('FERRAMENTA —','SIMULADOR —')) and unit:unit['blocks'].append({'title':title,'body':'','readiness':title})
   elif title in ['MISSÃO','MISSÃO DO MÓDULO'] and n<10:
    label=missionNames[n-1];unit={'id':f'f4-m{n}-challenge','title':label,'kind':'challenge','blocks':[{'title':label,'body':'','readiness':'module-challenge','module':n}]};module['lessons'].append(unit)
   elif title in missionNames and unit and unit['kind']=='challenge':unit['blocks'][0]['body']=body.replace('O aluno escolherá','Escolha').replace('O aluno deverá','Você deverá')
   elif title.startswith('AVALIAÇÃO DO MÓDULO'):
    count=25 if n in [3,8] else 20;unit={'id':f'f4-m{n}-exam','title':title,'kind':'exam','blocks':[{'title':title,'body':f'{count} situações sobre a sua postura. Aprovação a partir de 70%.','readiness':'module-exam','module':n}]};module['lessons'].append(unit)
  if n==10:module['lessons'].append({'id':'f4-m10-campaign','title':'30 DIAS DE PRONTIDÃO','kind':'challenge','blocks':[{'title':'30 DIAS DE PRONTIDÃO','body':'Escolha um ajuste emocional, um prático, um de comunicação, um de saúde/rotina e um de limites. Revise semanalmente. Concluir o preparatório não significa estar perfeito para um relacionamento.','readiness':'campaign'}]})
  modules.append(module)
 opening=source[source.index('# O QUE É A FASE IV?'):source.index('# DIAGNÓSTICO DE ENTRADA')]
 contract=source[source.index('# CONTRATO DA PRONTIDÃO'):source.index('# INICIAR A PRONTIDÃO')].split('apresentar:',1)[1].replace('Botão:','')
 code=source[source.index('## 1. NÃO ENTRAREI'):source.index('# BOTÃO')]
 ending=source[source.index('# A CASA ESTÁ SENDO PREPARADA'):source.index('# INSTRUÇÕES DEFINITIVAS')]
 passageNames=['DESCUBRA SUA MOTIVAÇÃO','FECHE UMA PORTA DO PASSADO','REGULE ANTES DE REAGIR','PRATIQUE ABERTURA','DEFINA SEUS LIMITES','ARRUME A VIDA','DEFINA SEU CÓDIGO DE INTIMIDADE','RESOLVA UMA CONVERSA','DESENHE SUA VIDA']
 passageBodies=['Finalize o mapa de motivação e observe suas maiores influências.','Realize uma ação segura relacionada a uma pendência emocional. Não precisa retomar contato com alguém.','Registre três situações reais em que regulou sua resposta antes de reagir.','Pratique uma conversa honesta com alguém confiável. Não precisa ser romântica.','Construa cinco limites sobre sua própria participação, sem controlar outra pessoa.','Resolva três pendências práticas.','Conclua seus princípios pessoais sobre intimidade responsável.','Aplique escuta, pedido, limite ou desculpa em uma situação real e segura.','Conclua a Arquitetura da Vida Futura e a página da vida que está construindo.']
 return {'id':'fase-4','title':'A Prontidão','subtitle':'Prepare sua vida antes de convidar alguém para compartilhá-la','revision':1,'opening':clean(re.sub(r'^# ','## ',clean(opening),flags=re.M)),'modules':modules,'before':[stage('f4-entrada','RAIO-X DA PRONTIDÃO','diagnostic','50 afirmações em oito áreas. Observe sua prática recente; as respostas não estabelecem um diagnóstico clínico.'),stage('f4-contrato','CONTRATO DA PRONTIDÃO','contract',clean(contract))],'passages':[stage(f'f4-passagem-{i}',title,'passage',passageBodies[i-1],passage=i) for i,title in enumerate(passageNames,1)],'after':[stage('f4-prova','PROVA FINAL DA FASE 4','final-exam','50 situações práticas distribuídas pelos dez módulos. Aprovação: 70%.'),stage('f4-espelho','O ESPELHO DO FUTURO PARCEIRO','simulation','Observe suas próprias respostas em 15 situações hipotéticas. O foco é a sua postura, não avaliar outra pessoa.'),stage('f4-saida','DIAGNÓSTICO FINAL — PRONTIDÃO','exit','Refaça as mesmas afirmações e compare apenas suas respostas declaradas.'),stage('f4-dossie','DOSSIÊ DE PRONTIDÃO','dossier','O HOMEM QUE VOCÊ LEVARÁ PARA UMA FUTURA RELAÇÃO'),stage('f4-codigo','CÓDIGO DA PRONTIDÃO','code',clean(code))],'ending':clean(re.sub(r'^# ','## ',clean(ending),flags=re.M))}
