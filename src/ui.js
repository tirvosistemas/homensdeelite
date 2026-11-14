export const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const inline=t=>esc(t).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
function prose(text){return text.split(/\n\s*\n/).filter(t=>t.trim()&&t.trim()!=='---').map(t=>{
 t=t.trim();if(t.startsWith('### '))return '<h3>'+inline(t.slice(4))+'</h3>';
 if(t.startsWith('## '))return '<h2>'+inline(t.slice(3))+'</h2>';
 if(t.startsWith('> '))return '<blockquote>'+inline(t.replace(/^>\s*/gm,''))+'</blockquote>';
 if(t.split('\n').every(l=>/^[-*] /.test(l)))return '<ul>'+t.split('\n').map(l=>'<li>'+inline(l.slice(2))+'</li>').join('')+'</ul>';
 return '<p>'+inline(t).replace(/\n/g,'<br>')+'</p>';
 }).join('');}
export function markdown(text){const chunks=text.split(/^## (.+)$/m);return prose(chunks[0])+Array.from({length:Math.floor((chunks.length-1)/2)},(_,i)=>`<details><summary>${inline(chunks[i*2+1])}</summary><div>${prose(chunks[i*2+2])}</div></details>`).join('');}
export const bar=p=>`<div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(p)}"><span style="width:${Math.max(0,Math.min(100,p))}%"></span></div>`;
export const field=(label,name,value='',type='text')=>`<label class="field">${esc(label)}${type==='textarea'?`<textarea name="${esc(name)}" required>${esc(value)}</textarea>`:`<input type="${type}" name="${esc(name)}" value="${esc(value)}" required>`}</label>`;
export function download(name,text,type='text/plain;charset=utf-8'){const url=URL.createObjectURL(new Blob([text],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
