const fs=require('fs').promises;

async function veritiGetirveKaydet() {
    const api="https://jsonplaceholder.typicode.com/posts/1";
    try{
        console.log("İnternetten veri çekme işlemi başlatıldı");
        const cevap=await fetch(api);
        const veri=await cevap.json();
        console.log("Veri çekildi şimdi dosyaya yazılıyor...");
        await fs.writeFile('veri.json',JSON.stringify(veri,null,2));
    }
    catch(hata){
        console.error("Bir şeyler yanlış gitti yakalanan hata: ",hata.message);
    }
    
}
veritiGetirveKaydet();
