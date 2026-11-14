"""Integra a expansão por módulo/número, preservando IDs e blocos da primeira versão."""
import re, json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
# Orientações editoriais são implementadas, nunca entregues como texto de aula.
REPHRASE={
 'Esta aula deverá ajudar o aluno a identificar o problema pela linguagem.':'Pensamentos repetidos também aparecem na linguagem. Observe como você fala de si e das suas relações.',
 'Esta aula é extremamente importante.\n\nMas deverá ser construída com inteligência.\n\nNão ensinar ao aluno:\n\n“Quando uma mulher demora, ela está jogando.”\n\nIsso tornaria o homem paranoico.':'Uma demora não permite concluir que alguém está fazendo um jogo. Interprete contexto antes de atribuir intenções.',
 'Esta aula deverá ser profunda.\n\nPorque muitos homens':'Muitos homens',
 'Esta aula não deverá afirmar que todo homem criado sem pai ficará problemático.\n\nIsso seria simplista.':'Não é correto afirmar que todo homem criado sem pai terá problemas. Histórias de formação são diversas.',
 'Preservar e aprofundar a aula anterior sobre masculinidade.':'A força precisa caminhar com controle, responsabilidade e respeito.',
 'Apresente a ideia:':'Princípio central:',
 'Preservar conteúdo anterior e aprofundar.':'Autocontrole não exige eliminar sentimentos.',
 'Ensinar que autocontrole não é repressão absoluta.':'Autocontrole não é repressão absoluta.',
 'Não transformar abstinência ou consumo em competição.':'Abstinência e consumo não são competições.',
 'Quando houver sinais de dependência, orientar apoio profissional.':'Quando houver sinais de dependência, procure apoio profissional adequado.',
 'Não usar pseudo-neurociência.\n\nNão dizer que “dopamina acabou”.\n\nFocar em comportamento.':'Observe comportamentos e consequências reais. Não se trata de afirmar que sua “dopamina acabou”.',
 'Criar auditoria:':'Observe sua rotina:',
 'Não transformar o treinamento em culto ao corpo.':'Cuidar do corpo não exige transformá-lo em objeto de culto.',
 'Aprofundar “aumentar atrito”.':'Aumentar o atrito de um hábito indesejado ajuda a interromper o automático.',
 'Manter ferramenta anterior.\n\nAumentar para cinco planos.':'Construa cinco respostas antecipadas para momentos de pressão.',
 'Expandir método 30–30–30.':'No método 30–30–30, aprender, praticar e produzir se complementam.',
 'Ensinar que o homem acumula ativos invisíveis:':'Você também acumula ativos invisíveis:',
 'Preservar Quatro Caixas.':'Use as quatro caixas: sobrevivência, construção, proteção e lazer.',
 'Não dar aconselhamento específico de investimento.':'O foco aqui é organização financeira, não a indicação de investimentos específicos.',
 'Mostrar que combinação de habilidades pode diferenciar.':'Combinações de habilidades podem diferenciar seu trabalho.',
 'Manter o Mapa de 90 Dias e torná-lo peça central.\n\nCriar checkpoints:':'Retome sua meta de 90 dias e observe os resultados nos marcos:',
 'Ensinar planejamento semanal simples:':'Um planejamento semanal simples inclui:',
 'Preservar conteúdo.':'Sua palavra compromete sua credibilidade.',
 'Expandir bastante assertividade.\n\nEnsinar estrutura:':'Uma estrutura para se comunicar com assertividade:',
 'Treinador do Não ampliado.\n\nSituações:':'Pratique dizer não com respeito em situações de:',
 'Novo conteúdo.':'Discrição é uma prática de confiança.',
 'Manter Matriz.\n\nExpandir categorias:':'Desenvolva autonomia em áreas como:',
 'Manter painel.\n\nAdicionar:':'Observe diariamente:',
 'Definir explicitamente.':'Neste treinamento, o conceito está ligado a comportamento e caráter.',
 'Preservar todos os accordions anteriores e aprofundar.\n\nAdicionar:':'Além dos sinais já estudados, observe:',
 'Ensinar que reciprocidade não é contabilidade.':'Reciprocidade não é contabilidade.',
 'Trazer os conhecimentos do Módulo 1 para relacionamentos.':'Aplique o discernimento praticado no primeiro módulo às relações.',
 'não ensinar o aluno a diagnosticar intenção com base em um único acontecimento.':'não conclua uma intenção com base em um único acontecimento.',
 'Aprofundar conceito.\n\nLiderança masculina defendida pelo treinamento deverá ser apresentada como:':'A liderança defendida pelo treinamento reúne:',
 'Esta aula é obrigatória.\n\nDepois de dezenas de critérios para observar uma mulher, virar o espelho.':'Depois de observar critérios de relacionamento, volte o espelho para si mesmo.',
 'Mesmo que o aluno ainda não tenha filhos.':'Preparar-se pode começar antes de ter filhos.',
 'Ferramenta reflexiva.\n\nO aluno escolhe:':'Reflita sobre sua história:',
 'Preservar conteúdo anterior.\n\nAprofundar limites familiares.':'Gratidão e limites familiares podem coexistir.',
 'Aprofundar Auditoria da Irmandade.\n\nAdicionar ambientes digitais.\n\nPerguntar:':'Observe também os ambientes digitais:',
 'Preservar Sistema de Retorno.':'Retome seu protocolo de retorno.',
 'O aluno criará seu sistema pessoal.':'Construa seu sistema pessoal.',
 'Para cada:\n\n“Qual é minha regra mínima?”':'Para cada área, pergunte: “Qual é minha regra mínima?”',
}
def clean(text):
 for old,new in REPHRASE.items():text=text.replace(old,new)
 text=re.sub(r'(?m)^(?:Ensinar|Trabalhar|Expandir|Aprofundar|Adicionar|Confrontar|Separar):?\s*$', '',text)
 text=re.sub(r'(?m)^---\s*$', '',text)
 text=re.sub(r'\n{3,}','\n\n',text).strip()
 return text

def blocks_for(text):
 # Only section-level headings split blocks; sub-headings remain accordions.
 text=re.sub(r'^## (FERRAMENTA[^\n]*)$',r'# \1',text,flags=re.M)
 split=re.split(r'^# (.+?)\s*$',text,flags=re.M)
 items=[('Aprofundamento',split[0])]+[(split[i],split[i+1]) for i in range(1,len(split),2)]
 blocks=[]
 for title,body in items:
  if title in ['VOCÊ ACABA DE ENTRAR NA FORJA','ALERTA','CONQUISTA','CÓDIGO PESSOAL DE MARCOS']:continue
  if not body.strip() and title=='Aprofundamento':continue
  is_tool=title.startswith(('FERRAMENTA','SIMULADOR','PAINEL','TREINADOR','MISSÃO'))
  if is_tool:
   data={}
   if 'RAIO-X DO MODO GADO' in title and '## SINAL 16' in body:
    data['additionalSignals']=clean(body[body.index('## SINAL 16'):])
   blocks.append({'title':title,'body':'','interactive':True,'expansion':True,**data})
   continue
  # Explicit editorial blocks with real lesson content after a marker.
  if '[INSTRUÇÃO PARA ASTRA]' in body:
   if '### “' in body:
    before=body.split('[INSTRUÇÃO PARA ASTRA]')[0]
    real=body[body.index('### “'):].replace('### “','## “')
    body=before+real
   else:body=body.split('[INSTRUÇÃO PARA ASTRA]')[0]
  body=clean(body)
  if body:blocks.append({'title':title,'body':body,'interactive':False,'expansion':True})
 return blocks

def expand(course):
 raw=(ROOT/'docs/expansao-fase-1.md').read_text()
 chunks=re.split(r'^# MÓDULO (\d+)\s*$',raw,flags=re.M)
 report=[]
 for j in range(1,len(chunks),2):
  number=int(chunks[j]);chunk=chunks[j+1];module=course['modules'][number-1]
  headings=list(re.finditer(r'^# AULA (\d+) — (.+?)\s*$',chunk,re.M))
  original={int(re.match(r'AULA (\d+)',u['title']).group(1)):u for u in module['lessons'] if u['kind']=='lesson'}
  extra=[]
  for k,h in enumerate(headings):
   n=int(h.group(1));name=h.group(2);text=chunk[h.end():headings[k+1].start() if k+1<len(headings) else len(chunk)]
   text=re.split(r'^# (?:PROVA |DESAFIO |AVALIAÇÃO FINAL)',text,flags=re.M)[0]
   newblocks=blocks_for(text)
   # Tools with source-only prescriptions are rendered by registered definitions.
   for b in newblocks:
    if b['title']=='Aprofundamento':b['title']='Expansão — '+name
   if n in original:
    unit=original[n];unit['expansionTitle']=name;unit['blocks'].extend(newblocks);status='complementada'
   else:
    unit={'id':f'm{number}-exp-a{n}','title':f'AULA {n} — {name}','kind':'lesson','blocks':newblocks};extra.append(unit);status='nova'
   unit['lessonNumber']=n
   report.append({'module':number,'lesson':n,'status':status,'id':unit['id'],'title':name})
  lessons=list(original.values())+extra
  module['lessons']=sorted(lessons,key=lambda u:u['lessonNumber'])+[u for u in module['lessons'] if u['kind']!='lesson']
 # Additional final reflections retain existing IDs/notes and append blocks.
 final=course['modules'][5]
 mirror=next(u for u in final['lessons'] if u['kind']=='reflection')
 mirror['blocks'].extend([{'title':'FERRAMENTA — O ESPELHO DE RETORNO','body':'','interactive':True,'expansion':True},{'title':'O GRANDE ESPELHO','body':'**Se seu filho se tornasse exatamente o homem que você está sendo hoje, você ficaria orgulhoso?**\n\nSe a resposta não for completamente sim, agora você sabe onde a próxima Forja começa.','interactive':False,'expansion':True}])
 code=raw.split('# CÓDIGO DOS HOMENS DE ELITE\n')[1].split('# TELA FINAL DA FASE I')[0]
 code=code[code.index('## 13.'):]
 final['lessons'][-1]['blocks'].append({'title':'Expansão — Compromissos 13 a 18','body':clean(code),'interactive':False,'expansion':True})
 # Track the new comparison requirements/version without changing existing IDs.
 course['revision']=2
 course['expansionMap']=report
 return course
