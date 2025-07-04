import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { vknUret } from '../../helpers/vknUret';
import { rastgeleString } from '../../helpers/stringUret';
import { ePostaUret } from '../../helpers/ePostaUret';
import { telNoUret } from '../../helpers/telNoUret';
import { zoom } from '../../helpers/zoom';


test('Deneme', async ({ page }) => {

  // Önce sisteme giriş yap
  await login(page);

  // Zoom işlemi
  await zoom(page);


  // ===== ADIM 1: Dashboard'da Üye İşyeri Yönetimi Menüsünü Bulma =====
  // Üye işyeri yönetimi bul ve tıkla
  const uyeIsyeriYonetimi = page.locator('text="Üye İşyeri Yönetimi"'); 
  await uyeIsyeriYonetimi.click();
  await page.waitForTimeout(1000);

  // ===== ADIM 2: Üye İşyeri Tıklama =====
  // Üye işyeri menü linkini bul ve tıkla (URL ile spesifik olarak hedefle)
  const uyeIsyeri = page.locator('a[href="/Merchant/Merchant/Index"]'); 
  await uyeIsyeri.click();
  await page.waitForTimeout(500);

  // ===== ADIM 3: Detay Menü =====
  // Detay menüye tıkla tıkla (ilk satır)
  const firstRowExpand = page.locator('tr').nth(1).locator('.k-hierarchy-cell').first();
  await firstRowExpand.click();
  await page.waitForTimeout(1000);


  /*
  // "ödeme tipleri" tıklama 
  const odemeTipleri = page.getByText('Ödeme Tipleri');
  await odemeTipleri.click();
  await page.waitForTimeout(1000);

  //"Yeni" butonu
  const yeniButton = page.getByRole('button', { name: '+ Yeni' });
  await yeniButton.click();
  await page.waitForTimeout(1000);

  // ===== ADIM 4: Ödeme Tipi Ekleme =====
  // Ödeme Tipi dropdown'ına tıkla
  const odemeTipiDropdown = page.locator('ot-data-entry-template').filter({ hasText: 'Ödeme Tipi' }).locator('span').first();
  await odemeTipiDropdown.click();
  await page.waitForTimeout(500);

  // Kesin belirli bir seçenek seçemeyiz, kullanılmış bir seçenek yazılırsa dropdownda gözükmeyeceğinden seçme işlemi olmayacaktır. 
  const options = await page.getByRole('option').all();
  // Rastgele bir seçenek seç
  const randomOption = options[Math.floor(Math.random() * options.length)]; 
  await randomOption.click();
  await page.waitForTimeout(500);

  // "Oluştur" butonuna tıkla
  const olusturButton = page.getByRole('button', { name: 'Oluştur' });
  await olusturButton.click();
  console.log('✅ Başarılı: Ödeme Tipi eklendi!');
  await page.waitForTimeout(1000);

  */

    // ===== ADIM 4: Ödeme Aracıları Ekleme =====
  // "ödeme Aracıları" tıklama 
  const odemeAracilari = page.getByText('Ödeme Aracıları');
  await odemeAracilari.click();
  await page.waitForTimeout(1000);

  //"Yeni" butonu
  const yeniButton = page.getByRole('button', { name: '+ Yeni' });
  await yeniButton.click();
  await page.waitForTimeout(1000);  

  // "Terminal tipi" seçimi
  const terminalTipi = page.locator('ot-data-entry-template').filter({ hasText: 'Terminal Tipi' }).locator('span').first();
  await terminalTipi.click();
  await page.waitForTimeout(500);

  // Rastgele bir seçenek seç
  const options2 = await page.getByRole('option').all();
  const randomOption2 = options2[Math.floor(Math.random() * options2.length)];
  await randomOption2.click();
  await page.waitForTimeout(500);

  // // "POS" seçeneğini seç
  // const posOption = page.getByRole('option', { name: 'POS' });
  // await posOption.click();
  // await page.waitForTimeout(500);

  // "Ödeme Aracısı" seçimi
  const odemeAracisi = page.locator('ot-data-entry-template').filter({ hasText: 'Ödeme Aracısı' }).locator('span').first();
  await odemeAracisi.click();
  await page.waitForTimeout(500);

  // Rastgele bir seçenek seç
  const options3 = await page.getByRole('option').all();
  const randomOption3 = options3[Math.floor(Math.random() * options3.length)];
  await randomOption3.click();
  await page.waitForTimeout(500);

  // Textbox'a tıkla ve "1234" yaz
  const textbox = page.getByRole('textbox');
  await textbox.click();
  await textbox.fill('1234');
  await page.waitForTimeout(500);

  // "Oluştur" butonuna tıkla
  const olusturButton = page.getByRole('button', { name: 'Oluştur' });
  await olusturButton.click();

  // // Popup mesajlarını yakalamak için gelişmiş sistem
  // console.log('🔍 Popup mesajı aranıyor...');
  
  // try {
  //   // Farklı popup türlerini kontrol et
  //   const popupSelectors = [
  //     '.swal2-popup',
  //     '.modal',
  //     '[role="dialog"]',
  //     '.toast',
  //     '.notification',
  //     '.alert'
  //   ];

  //   let popupBulundu = false;
    
  //   // Her popup türünü kontrol et
  //   for (const selector of popupSelectors) {
  //     try {
  //       const popup = page.locator(selector);
  //       const gorunurMu = await popup.isVisible({ timeout: 1000 });
  //       if (gorunurMu) {
  //         console.log(`🔍 Popup tespit edildi: ${selector}`);
  //         popupBulundu = true;
          
  //                    // Popup içeriğini oku
  //          const popupText = await popup.textContent();
  //          if (popupText) {
  //            console.log('📋 Popup İçeriği:', popupText.trim());
  //          }
           
  //          // Başarı mesajlarını kontrol et
  //          const basariKelimeleri = ['başarılı', 'başarıyla', 'success', 'tamamlandı'];
  //          const icerikKucuk = popupText ? popupText.toLowerCase() : '';
          
  //         if (basariKelimeleri.some(kelime => icerikKucuk.includes(kelime))) {
  //           console.log('✅ Başarılı: Ödeme Aracısı başarıyla eklendi!');
  //         } else {
  //           // Hata mesajlarını kontrol et
  //           const hataKelimeleri = ['hata', 'error', 'uyarı', 'warning', 'mevcut', 'zaten'];
  //           if (hataKelimeleri.some(kelime => icerikKucuk.includes(kelime))) {
  //             console.log('❌ Hata/uyarı mesajı tespit edildi');
  //           } else {
  //             console.log('❓ Belirsiz popup mesajı');
  //           }
  //         }
          
  //         // Popup'ı kapat
  //         const kapatButton = popup.locator('.swal2-confirm, .swal2-cancel, .btn-close, [aria-label="Close"], .close');
  //         const kapatVarMi = await kapatButton.isVisible();
  //         if (kapatVarMi) {
  //           await kapatButton.click();
  //           await page.waitForTimeout(500);
  //         }
          
  //         break;
  //       }
  //     } catch (e) {
  //       continue;
  //     }
  //   }

  //   if (!popupBulundu) {
  //     console.log('❓ Popup tespit edilemedi, sayfa mesajları kontrol ediliyor...');
      
  //     // Sayfada herhangi bir mesaj var mı kontrol et
  //     const sayfaMesajSelectors = [
  //       '.alert',
  //       '.message', 
  //       '.notification',
  //       '.toast',
  //       '[role="alert"]',
  //       '.error',
  //       '.success',
  //       '.warning'
  //     ];
      
  //     for (const selector of sayfaMesajSelectors) {
  //       try {
  //         const mesajlar = await page.locator(selector).all();
  //         if (mesajlar.length > 0) {
  //           for (const mesaj of mesajlar) {
  //             const mesajText = await mesaj.textContent();
  //             if (mesajText && mesajText.trim()) {
  //               console.log(`📋 Sayfa Mesajı (${selector}):`, mesajText.trim());
  //             }
  //           }
  //         }
  //       } catch (e) {
  //         continue;
  //       }
  //     }
      
  //     // Son çare: tüm sayfada "başarılı" veya "hata" kelimelerini ara
  //     const sayfaIcerigi = await page.textContent('body');
  //     if (sayfaIcerigi) {
  //       const icerikKucuk = sayfaIcerigi.toLowerCase();
  //       if (icerikKucuk.includes('başarılı') || icerikKucuk.includes('başarıyla')) {
  //         console.log('✅ Sayfa içeriğinde başarı mesajı bulundu');
  //       } else if (icerikKucuk.includes('hata') || icerikKucuk.includes('error')) {
  //         console.log('❌ Sayfa içeriğinde hata mesajı bulundu');
  //       }
  //     }
  //   }

  // } catch (error) {
  //   console.log('❌ Popup mesajı yakalanırken hata oluştu:', error.message);
  // }

  // // Test sonunda ekranın kapanmasını engellemek için pause
  // await page.pause();

}); 