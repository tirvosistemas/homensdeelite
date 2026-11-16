import {marriageCases} from './marriage-cases.js';
export const rotateQuestion=(q,offset)=>{const order=q[1].map((_,i)=>(i+offset)%q[1].length);return [q[0],order.map(i=>q[1][i]),order.indexOf(q[2]),q[3]];};
export const caseQuestions=cases=>cases.map((c,i)=>rotateQuestion([c[0],[c[1],c[2],c[3]],0,c[4]],i%3));
export const marriageExams=marriageCases.map((cases,m)=>{const result=caseQuestions(cases);cases.forEach((c,i)=>result.push(rotateQuestion([c[0]+' Qual princípio deve orientar a análise?',[c[4],cases[(i+3)%10][4],cases[(i+6)%10][4]],0,c[4]],(m+i)%3)));if(![3,4,9,11,13,15].includes(m))for(let i=0;i<5;i++){const c=cases[i];result.push(rotateQuestion(['Revisão do caso: '+c[0]+' Qual ação e fundamento são coerentes?',[c[1]+' '+c[4],c[2]+' '+cases[(i+2)%10][4],c[3]+' '+cases[(i+5)%10][4]],0,c[4]],(m+i+1)%3));}return result;});
// A distribuição do documento soma 113, dentro do pedido aproximado de 110.
export const marriageFinalDistribution=[7,8,7,6,6,8,9,7,8,6,8,6,8,6,7,6];
export const marriageFinal=marriageFinalDistribution.flatMap((n,m)=>marriageExams[m].slice(0,n));
