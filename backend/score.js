function scores(opt='get',score){
    const data = new URLSearchParams()
        data.append("opt", opt)
        data.append("score",score)

    const myRequest = new Request("backend/scores.php",{
        method : "POST",
        body : data
    });

    const myPromisse = new Promise((resolve,reject) =>{
        fetch(myRequest)
        .then(function (response){
            if (response.status === 200) { 
                resolve(response.text());                    
            } else { 
                reject(new Error("Houve algum erro na comunicação com o servidor"));                    
            } 
        })
    })

    return myPromisse
}

function showScore(json){
    document.querySelector('.board').innerHTML = '<h1 class="center">TOP 10</h1>'
    const table = document.createElement('table')
    for(let i=0; i<json.length; i++){
        const row = document.createElement('tr')
        const nome = document.createElement('td')
        nome.innerHTML = json[i].nome
        row.appendChild(nome)
        const scr = document.createElement('td')
        scr.innerHTML = Math.floor(Number(json[i].score)/60).toString().padStart(2,0)+':'+(Number(json[i].score)%60).toString().padStart(2,0)
        row.appendChild(scr)
        table.appendChild(row)
    }
    document.querySelector('.board').appendChild(table)
    hiscore = json
}

function getScore(){
    scores().then((resp)=>{
        const json = JSON.parse(resp)
        showScore(json)
    })
}

function setScore(tempo){
    const score = scores()
    const out = []
    score.then((resp)=>{
        const json = JSON.parse(resp)
        let top =  false
        for(let i=0; i<json.length; i++){
            if(json[i].score > tempo && !top){
                const obj = new Object
                    obj.nome = prompt('Parabéns, vc esta no TOP 10!. Digite seu nome:')
                    obj.score = tempo
                    out.push(obj)
                    top = 1
            }
            out.push(json[i])
        }
        out.splice(10,1)        
        scores('set',JSON.stringify(out)).then((resp)=>{
            const json = JSON.parse(resp)
            showScore(json)
        })
        
 
    })



}