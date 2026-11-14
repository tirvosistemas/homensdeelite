"""Converte o material oficial em blocos de leitura, sem expor instruções ao aluno."""
import re, json, sys, runpy
from pathlib import Path
root=Path(__file__).resolve().parents[1]
text=(root/'docs/conteudo-oficial.md').read_text()
parts=re.split(r'^# (.+?)\s*$',text,flags=re.M)
sections=[{'title':parts[i].strip(),'body':parts[i+1].strip()} for i in range(1,len(parts),2)]
modules=[]; current=None; lesson=None
intro=[]; ending=[]
for s in sections:
 t=s['title']; body=s['body']
 if t.startswith('PRINCÍPIOS DE EXPERIÊNCIA'): break
 if t.startswith('MÓDULO '):
  current={'id':f'm{len(modules)+1}','title':'','intro':'','lessons':[]}; modules.append(current); lesson=None;continue
 if current is None:
  if t in ['ABERTURA DO TREINAMENTO','CÓDIGO DE CONDUTA DO TREINAMENTO']:intro.append(s)
  continue
 if not current['title']:
  current['title']=t;current['intro']=body;continue
 if t.startswith('TELA DE CONCLUSÃO') or t.startswith('A PRIMEIRA FORJA'):continue
 # Standalone activities and evaluations remain discoverable in the trail.
 standalone=t.startswith(('DESAFIO','AVALIAÇÃO','PROVA FINAL','O ESPELHO FINAL','O CÓDIGO DOS HOMENS'))
 if t.startswith('AULA ') or standalone:
  kind='lesson'
  if t.startswith('DESAFIO'):kind='challenge'
  if t.startswith(('AVALIAÇÃO','PROVA')):kind='exam'
  if t.startswith('O CÓDIGO'):kind='pledge'
  if t.startswith('O ESPELHO FINAL'):kind='reflection'
  lesson={'id':f'{current["id"]}-u{len(current["lessons"])+1}','title':t,'kind':kind,'blocks':[]};current['lessons'].append(lesson)
 if lesson is None:continue
 instruction='[INSTRUÇÃO PARA ASTRA]' in body
 clean=body.split('[INSTRUÇÃO PARA ASTRA]')[0].strip() if instruction else body
 if instruction and t in ['SINAIS DO MODO GADO','NÃO CONFUNDA POSTURA COM FRIEZA','O QUE OBSERVAR']:
  clean=body[body.find('## '):]
 clean=re.sub(r'(^|\n)---(?=\n|$)','',clean).strip()
 if t.startswith(('AVALIAÇÃO','PROVA')):clean=''
 if t.startswith('O CÓDIGO'):
  clean=body[body.find('## CÓDIGO'):] # exclude presentation instructions
 s.update({'body':clean,'interactive':instruction or t.startswith(('FERRAMENTA','SIMULADOR','AVALIAÇÃO','PROVA','DESAFIO','O CÓDIGO'))})
 if t=='REGISTRO DO DESAFIO':continue # same seven-day challenge, one award
 if t=='RADAR DO MODO GADO':continue # derived inside the preceding index
 lesson['blocks'].append(s)
course={'title':'A Jornada da Forja','intro':intro,'modules':modules}
if '--base-json' in sys.argv:
 print(json.dumps(course,ensure_ascii=False));sys.exit(0)
course=runpy.run_path(str(root/'scripts/expand-content.py'))['expand'](course)
course=runpy.run_path(str(root/'scripts/close-phase.py'))['close'](course)
course['consolidation']=runpy.run_path(str(root/'scripts/build-consolidation.py'))['build']()
course['ascension']=runpy.run_path(str(root/'scripts/build-ascension.py'))['build']()
(root/'src/course.json').write_text(json.dumps(course,ensure_ascii=False,indent=2))
print(f'{len(modules)} módulos; {sum(u["kind"]=="lesson" for m in modules for u in m["lessons"])} aulas; {sum(len(m["lessons"]) for m in modules)} etapas')

c=course['consolidation']
print(f'Fase II: {len(c["modules"])} módulos; {sum(u["kind"]=="lesson" for m in c["modules"] for u in m["lessons"])} aulas; {sum(len(m["lessons"]) for m in c["modules"])+len(c["before"])+len(c["passages"])+len(c["after"])} etapas')

a=course['ascension']
print(f'Fase III: {len(a["modules"])} módulos; {sum(u["kind"]=="lesson" for m in a["modules"] for u in m["lessons"])} aulas')
