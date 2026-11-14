"""Fecha a Fase I sem modificar IDs ou blocos das versões anteriores."""
import json
from pathlib import Path

def close(course):
 data=json.loads((Path(__file__).resolve().parents[1]/'docs/fechamento-fase-1.json').read_text())
 course['modules'].append(data['module'])
 course['phase']=data['phase']
 course['revision']=3
 return course
