"""Compila a Ascensão em seu próprio espaço, sem mover conteúdo anterior."""
import re
from pathlib import Path
root=Path(__file__).resolve().parents[1]
source=(root/'docs/fase-3-oficial.md').read_text()
def clean(body):
 body=re.sub(r'\[INSTRUÇÃO PARA [^\]]+\]\s*','',body)
 body=re.sub(r'^---\s*$','',body,flags=re.M)
 body=re.sub(r'^# =+\s*$','',body,flags=re.M)
 body=re.sub(r'\bcurso(s)?\b',lambda m:'treinamentos' if m[1] else 'treinamento',body,flags=re.I)
 for old,new in [('Ensinar o homem a sair da reação imediata e começar a pensar em:','Saia da reação imediata e comece a pensar em:'),('Não ensinar demissão impulsiva.','Evite decisões impulsivas de demissão.'),('Ensinar conceito de forma ética.','Use referências de forma ética.'),('Não ensinar mentira sobre preços ou ofertas inexistentes.','Não invente preços ou ofertas inexistentes.'),('Ensinar conceito sem recomendar produtos.','Liquidez é a facilidade de transformar um recurso em dinheiro disponível, considerando prazo e custos. Não há recomendação de produtos específicos.'),('Não fornecer recomendações personalizadas de investimento.','Este conteúdo não oferece recomendações personalizadas de investimento.'),('Não prometer retorno.','Não há promessa de retorno.'),('Ensinar:','Considere:'),('Trabalhar:','Observe:'),('Não responder pelo aluno.','A decisão depende dos seus objetivos e do seu julgamento.'),('Não prometer renda fácil.','Não existe promessa de renda fácil.'),('Não sugerir que todos precisam possuir múltiplas fontes imediatamente.','Nem todos precisam possuir múltiplas fontes imediatamente.')]:body=body.replace(old,new)
 return re.sub(r'\n{3,}','\n\n',body).strip()
def stage(id,title,mode,body='',**extra):return {'id':id,'title':title,'kind':'phase3','blocks':[{'title':title,'body':body,'ascension':mode,**extra}]}
def build():
 matches=list(re.finditer(r'^# MÓDULO (\d+)\n# (.+)\n# =+\s*$',source,re.M));modules=[]
 challengeNames=['7 DIAS DE DECISÕES CONSCIENTES','PROJETO DE EVIDÊNCIA','LIDERE UMA MISSÃO REAL','NEGOCIE ALGO REAL','PRIMEIRO EXPERIMENTO DE VALOR','ORGANIZE SEU CAPITAL','10 CONEXÕES DE VALOR']
 for i,m in enumerate(matches):
  n=i+1;end=matches[i+1].start() if i+1<len(matches) else source.index('# CAMPANHA DE ASCENSÃO — 180 DIAS')
  chunks=re.split(r'^# (.+)\s*$',source[m.end():end],flags=re.M);module={'id':f'f3-m{n}','title':m[2],'intro':clean(chunks[0]),'lessons':[]};unit=None
  for j in range(1,len(chunks),2):
   title=chunks[j].strip();text=clean(chunks[j+1])
   if title.startswith('AULA '):
    ln=int(re.match(r'AULA (\d+)',title)[1]);unit={'id':f'f3-m{n}-a{ln}','title':title,'kind':'lesson','lessonNumber':ln,'blocks':[{'title':title,'body':text}]};module['lessons'].append(unit)
    if (n,ln) in [(2,11),(6,11)]:
     unit['blocks'][0]['body']='Transforme sua direção em um plano documentado, com realidade atual, lacunas, evidências e próximos passos.' if n==2 else 'Organize sua situação atual, riscos e objetivos de longo prazo. Esta ferramenta não sugere ativos ou recomendações personalizadas de investimento.'
     unit['blocks'].append({'title':'PLANO DE ASCENSÃO PROFISSIONAL' if n==2 else 'PLANO PATRIMONIAL DE LONGO PRAZO','body':'','ascension':'career-plan' if n==2 else 'capital-plan'})
    if (n,ln)==(8,12):unit['blocks'].append({'title':'CAMPANHA DE ASCENSÃO — 180 DIAS','body':'Uma missão relevante, seis marcos, recursos, riscos e prestação de contas. Construa evidências; o calendário sozinho não comprova execução.','ascension':'campaign'})
   elif title.startswith(('FERRAMENTA —','SIMULADOR —','TREINADOR DE FEEDBACK')) and unit:unit['blocks'].append({'title':title,'body':'','ascension':title})
   elif title in ['DESAFIO DO MÓDULO','DESAFIO','MISSÃO']:
    if n>7:continue
    label=challengeNames[n-1];unit={'id':f'f3-m{n}-challenge','title':label,'kind':'challenge','blocks':[{'title':label,'body':'Realize a missão e registre evidências honestas da aplicação. Evite expor informações privadas de outras pessoas.','ascension':'module-challenge','module':n}]};module['lessons'].append(unit)
   elif title.startswith('AVALIAÇÃO DO MÓDULO'):
    unit={'id':f'f3-m{n}-exam','title':title,'kind':'exam','blocks':[{'title':title,'body':'25 decisões contextualizadas. Aprovação a partir de 70%; revise o raciocínio após responder.','ascension':'module-exam','module':n}]};module['lessons'].append(unit)
   elif title in ['REGRA'] and unit:unit['blocks'].append({'title':title,'body':text})
   elif title=='PRINCÍPIO' and unit is None:module['intro']+='\n\n'+text
  modules.append(module)
 opening=source[source.index('# O QUE É A ASCENSÃO?'):source.index('# DIAGNÓSTICO DE ENTRADA')]
 contract=source[source.index('# CONTRATO DA ASCENSÃO'):source.index('# INICIAR A ASCENSÃO')].split('Texto:',1)[1].replace('Botão:','')
 code=source[source.index('## 1. NÃO BUSCAREI PODER'):source.index('# BOTÃO')]
 ending=source[source.index('# A ASCENSÃO FOI CONCLUÍDA'):source.index('# INSTRUÇÕES DEFINITIVAS')]
 passages=[('UMA DECISÃO DIFÍCIL','Utilize matriz, riscos e consequências para tomar uma decisão real.'),('EVIDÊNCIA DE COMPETÊNCIA','Produza ou documente algo que prove capacidade profissional.'),('LIDERE SEM MICROGERENCIAR','Delegue uma responsabilidade real com clareza e acompanhamento. Sem liderança formal, utilize um pequeno projeto colaborativo.'),('NEGOCIAÇÃO PREPARADA','Realize uma negociação legítima utilizando preparação prévia, sem criar conflito artificial.'),('GERE VALOR','Teste uma oferta, serviço, projeto ou melhoria capaz de gerar valor econômico.'),('ARRUME A CASA FINANCEIRA','Complete seu balanço, mapa de risco e plano patrimonial geral.'),('ABRA UMA PORTA','Construa ou fortaleça uma relação profissional legítima, oferecendo valor antes de pedir alguma coisa.')]
 return {'id':'fase-3','title':'A Ascensão','subtitle':'Competência • Estratégia • Liderança • Influência • Capital • Construção','revision':1,'opening':clean(re.sub(r'^# ','## ',clean(opening),flags=re.M)),'modules':modules,'before':[stage('f3-entrada','ÍNDICE DE ASCENSÃO','diagnostic','Observe sua prática atual nas oito áreas. Os resultados são autorrelatos educacionais, não diagnósticos clínicos.'),stage('f3-contrato','CONTRATO DA ASCENSÃO','contract',clean(contract))],'passages':[stage(f'f3-passagem-{i}',t,'passage',b,passage=i) for i,(t,b) in enumerate(passages,1)],'after':[stage('f3-prova','PROVA FINAL DA FASE III','final-exam','50 decisões contextualizadas sobre as oito áreas da Ascensão. Aprovação: 70%.'),stage('f3-comando','A SALA DE COMANDO','simulation','Assuma a condução de um projeto fictício. Suas decisões mudam os recursos, a confiança e os acontecimentos seguintes.'),stage('f3-saida','DIAGNÓSTICO FINAL — ASCENSÃO','exit','Compare suas respostas atuais com o ponto de partida preservado.'),stage('f3-dossie','DOSSIÊ DA ASCENSÃO','dossier','CAPACIDADE, INFLUÊNCIA E CONSTRUÇÃO'),stage('f3-codigo','CÓDIGO DA ASCENSÃO','code',clean(code))],'ending':clean(re.sub(r'^# ','## ',clean(ending),flags=re.M))}
