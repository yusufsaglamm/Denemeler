
const fs=require('fs').promises;
const { error } = require('console');
const readline=require('readline/promises');
const{stdin:input,stdout:output}=require('process');
const { json } = require('stream/consumers');
const DOSYA_ADI="tum_postalar.json";

async function dosyayaKaydet(yeniveri) {
    let tumveriler=[];
    try{
        const dosyaveri=await fs.readFile(DOSYA_ADI,'utf-8');
        tumveriler=JSON.parse(dosyaveri);
    }
    catch(hata){
        console.log("Daha önce dosya oluşturulmamış bos dosya oluşturuluyor");
        tumveriler=[];
    }
    tumveriler.push(yeniveri);

    try{
        await fs.writeFile(DOSYA_ADI,JSON.stringify(tumveriler,null,2));
        console.log("Veriler başarılı şekile kaydedildi");
    }
     catch(yazmahatasi){
        console.log("Veriler yazılırken hata oluştu oluşan hata: ",yazmahatasi.message);
     }
}

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
            const verii=await veriyiGetirveKaydet(secilenID);
            await dosyayaKaydet(verii);
        }
    }
    catch(hata){
        console.log("İşlemde hata oluştu oluşan hata: ",hata.message);
    }
    finally{
        rl.close();
    }
    
}

async function veriyiGetirveKaydet(id) {
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
        return temizveri;
    }
    catch(hata){
        console.error("Bir şeyler yanlış gitti yakalanan hata: ",hata.message);
    }
    
}
kullanicidanAl();
