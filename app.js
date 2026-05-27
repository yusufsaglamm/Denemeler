
const fs=require('fs').promises;
const { error } = require('console');
const readline=require('readline/promises');
const{stdin:input,stdout:output}=require('process');

async function kullanicidanAl() {
    const rl=readline.createInterface({input,output});
    try{
        console.log("---APİ SORGULAMA SİSTEMİ---");
        const secilenID=await rl.question("Sorgulamak istediğiniz Post ID sini giriniz(1-100 arası): ");
        if(secilenID<1 || secilenID>100){
            console.log("Yanlış değer girdiniz");
        }
        else{
            console.log("Id alındı işleme devam ediliyor");
            await veritiGetirveKaydet(secilenID);
        }
    }
    catch(hata){
        console.log("İşlemde hata oluştu oluşan hata: ",hata.message);
    }
    finally{
        rl.close();
    }
    
}

async function veritiGetirveKaydet(id) {
    const api=`https://jsonplaceholder.typicode.com/posts/${id}`;
    try{
        console.log("İnternetten veri çekme işlemi başlatıldı");
        const cevap=await fetch(api);
        const veri=await cevap.json();
        const temizveri={
            id:veri.id,
            baslik:veri.title.toUpperCase(),
            icerik:veri.body,
            kayitTarihi:new Date().toISOString()
        };
        console.log("Veri çekildi şimdi dosyaya yazılıyor...");
        await fs.writeFile(`veri-${id}.json`,JSON.stringify(temizveri,null,2));
    }
    catch(hata){
        console.error("Bir şeyler yanlış gitti yakalanan hata: ",hata.message);
    }
    
}
kullanicidanAl();
