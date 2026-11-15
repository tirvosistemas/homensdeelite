import {datingCases} from './dating-cases.js';
const rotate=(question,options,correct,why,offset)=>{const order=options.map((_,i)=>(i+offset)%options.length);return [question,order.map(i=>options[i]),order.indexOf(correct),why];};
// Cada caso gera uma decisão prática e uma análise do princípio pertinente.
export const datingExams=datingCases.map((cases,m)=>{const questions=cases.map((c,i)=>rotate(c[0],[c[1],c[2],c[3]],0,c[4],(m+i)%3));cases.forEach((c,i)=>questions.push(rotate(c[0]+' Qual princípio melhor orienta a análise?',[c[4],cases[(i+3)%10][4],cases[(i+6)%10][4]],0,'Neste caso: '+c[4],(m+i+1)%3)));if([1,2,3,4,5,8,10].includes(m))for(let i=0;i<5;i++){const c=cases[i];questions.push(rotate('Ao revisar o caso: '+c[0]+' Qual resposta combina ação e fundamento?',[c[1]+' '+c[4],c[2]+' '+cases[(i+2)%10][4],c[3]+' '+cases[(i+5)%10][4]],0,'A ação deve ser coerente com o contexto e com o princípio: '+c[4],(m+i+2)%3));}return questions;});
export const datingFinalDistribution=[6,7,7,7,8,7,6,6,8,6,6,6];
export const datingFinal=datingFinalDistribution.flatMap((n,m)=>datingExams[m].slice(0,n));
