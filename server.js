const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000; // Gunakan port dari environment atau default 3000

// Konstanta dan fungsi helper
const countryMap = {
    "AF": "Afghanistan 🇦🇫", "AL": "Albania 🇦🇱", "DZ": "Aljazair 🇩🇿", "AD": "Andorra 🇦🇩", "AO": "Angola 🇦🇴",
    "AR": "Argentina 🇦🇷", "AM": "Armenia 🇦🇲", "AU": "Australia 🇦🇺", "AT": "Austria 🇦🇹", "AZ": "Azerbaijan 🇦🇿",
    "BH": "Bahrain 🇧🇭", "BD": "Bangladesh 🇧🇩", "BY": "Belarus 🇧🇾", "BE": "Belgia 🇧🇪", "BZ": "Belize 🇧🇿",
    "BJ": "Benin 🇧🇯", "BT": "Bhutan 🇧🇹", "BO": "Bolivia 🇧🇴", "BA": "Bosnia & Herzegovina 🇧🇦", "BW": "Botswana 🇧🇼",
    "BR": "Brasil 🇧🇷", "BN": "Brunei 🇧🇳", "BG": "Bulgaria 🇧🇬", "BF": "Burkina Faso 🇧🇫", "BI": "Burundi 🇧🇮",
    "KH": "Kamboja 🇰🇭", "CM": "Kamerun 🇨🇲", "CA": "Kanada 🇨🇦", "CF": "Republik Afrika Tengah 🇨🇫", "TD": "Chad 🇹🇩",
    "CL": "Chili 🇨🇱", "CN": "Tiongkok 🇨🇳", "CO": "Kolombia 🇨🇴", "KM": "Komoro 🇰🇲", "CD": "Kongo 🇨🇩",
    "CR": "Kosta Rika 🇨🇷", "HR": "Kroasia 🇭🇷", "CU": "Kuba 🇨🇺", "CY": "Siprus 🇨🇾", "CZ": "Republik Ceko 🇨🇿",
    "DK": "Denmark 🇩🇰", "DJ": "Djibouti 🇩🇯", "DO": "Republik Dominika 🇩🇴", "EC": "Ekuador 🇪🇨", "EG": "Mesir 🇪🇬",
    "SV": "El Salvador 🇸🇻", "GQ": "Guinea Khatulistiwa 🇬🇶", "ER": "Eritrea 🇪🇷", "EE": "Estonia 🇪🇪", "ET": "Ethiopia 🇪🇹",
    "FI": "Finlandia 🇫🇮", "FR": "Prancis 🇫🇷", "GA": "Gabon 🇬🇦", "GM": "Gambia 🇬🇲", "GE": "Georgia 🇬🇪",
    "DE": "Jerman 🇩🇪", "GH": "Ghana 🇬🇭", "GR": "Yunani 🇬🇷", "GT": "Guatemala 🇬🇹", "GN": "Guinea 🇬🇳",
    "IN": "India 🇮🇳", "ID": "Indonesia 🇮🇩", "IR": "Iran 🇮🇷", "IQ": "Irak 🇮🇶", "IE": "Irlandia 🇮🇪",
    "IL": "Israel 🇮🇱", "IT": "Italia 🇮🇹", "JP": "Jepang 🇯🇵", "JO": "Yordania 🇯🇴", "KZ": "Kazakhstan 🇰🇿",
    "KE": "Kenya 🇰🇪", "KR": "Korea Selatan 🇰🇷", "KW": "Kuwait 🇰🇼", "LA": "Laos 🇱🇦", "LV": "Latvia 🇱🇻",
    "LB": "Lebanon 🇱🇧", "LY": "Libya 🇱🇾", "LT": "Lituania 🇱🇹", "LU": "Luksemburg 🇱🇺", "MG": "Madagaskar 🇲🇬",
    "MY": "Malaysia 🇲🇾", "MV": "Maladewa 🇲🇻", "ML": "Mali 🇲🇱", "MT": "Malta 🇲🇹", "MX": "Meksiko 🇲🇽",
    "MA": "Maroko 🇲🇦", "MM": "Myanmar 🇲🇲", "NP": "Nepal 🇳🇵", "NL": "Belanda 🇳🇱", "NZ": "Selandia Baru 🇳🇿",
    "NG": "Nigeria 🇳🇬", "NO": "Norwegia 🇳🇴", "OM": "Oman 🇴🇲", "PK": "Pakistan 🇵🇰", "PA": "Panama 🇵🇦",
    "PY": "Paraguay 🇵🇾", "PE": "Peru 🇵🇪", "PH": "Filipina 🇵🇭", "PL": "Polandia 🇵🇱", "PT": "Portugal 🇵🇹",
    "QA": "Qatar 🇶🇦", "RO": "Rumania 🇷🇴", "RU": "Rusia 🇷🇺", "SA": "Arab Saudi 🇸🇦", "SN": "Senegal 🇸🇳",
    "SG": "Singapura 🇸🇬", "ZA": "Afrika Selatan 🇿🇦", "ES": "Spanyol 🇪🇸", "SE": "Swedia 🇸🇪", "CH": "Swiss 🇨🇭",
    "TH": "Thailand 🇹🇭", "TR": "Turki 🇹🇷", "UA": "Ukraina 🇺🇦", "AE": "Uni Emirat Arab 🇦🇪", "GB": "Inggris 🇬🇧",
    "US": "Amerika Serikat 🇺🇸", "UZ": "Uzbekistan 🇺🇿", "VE": "Venezuela 🇻🇪", "VN": "Vietnam 🇻🇳", "YE": "Yaman 🇾🇪",
    "ZW": "Zimbabwe 🇿🇼"
};

async function stalkml(uid, server) {
    try {
        const response = await axios({
            method: 'post',
            url: 'https://moogold.com/wp-content/plugins/id-validation-new/id-validation-ajax.php',
            data: new URLSearchParams({
                attribute_amount: null,
                'text-5f6f144f8ffee': uid,
                'text-1601115253775': server,
                quantity: '1',
                'add-to-cart': '15145',
                product_id: '15145',
                variation_id: null
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': '*/*',
                'X-Requested-With': 'XMLHttpRequest',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Host': 'moogold.com',
                'Origin': 'https://moogold.com/product/mobile-legends/',
                'Referer': 'https://moogold.com/product/mobile-legends/'
            }
        });

        const message = response.data.message;
        if (!message || typeof message !== 'string') {
            throw new Error('Format respons tidak valid dari MooGold');
        }

        const lines = message.split('\n').map(line => line.trim());
        const countryCode = lines[3]?.split(': ')[1] || null;

        return {
            userID: lines[0]?.split(': ')[1] || null,
            serverID: lines[1]?.split(': ')[1] || null,
            nickname: lines[2]?.split(': ')[1] || null,
            country: countryCode,
            negara: countryMap[countryCode] || countryCode
        };
    } catch (error) {
        // Lemparkan error agar bisa ditangkap di block catch selanjutnya
        throw new Error('Gagal mengambil data nickname: ' + error.message);
    }
}

// Endpoint API
app.get('/cekml', async (req, res) => {
    const { id, server } = req.query;

    if (!id || !server) {
        return res.status(400).json({
            status: false,
            creator: 'Firman Evergarden ^_^',
            message: 'Parameter "id" dan "server" dibutuhkan'
        });
    }

    try {
        // 1. Dapatkan data nickname dan negara dari moogold
        const cekId = await stalkml(id, server);
        if (!cekId.nickname) {
             return res.status(404).json({
                status: false,
                creator: 'Firman Evergarden ^_^',
                message: 'User ID atau Server ID tidak ditemukan.'
            });
        }

        // 2. Dapatkan data double recharge dari mobapay
        const mobaPayResponse = await axios.get(`https://api.mobapay.com/api/app_shop?app_id=100000&game_user_key=${id}&game_server_key=${server}&country=${cekId.country}&language=en&network=&net=&coupon_id=&shop_id=`);
        const mobaPayData = mobaPayResponse.data.data.shop_info.shelf_location[0].goods;

        const resultData = {
            id: id,
            server: server,
            nickname: cekId.nickname,
            country_code: cekId.country,
            country_name: cekId.negara,
            double_recharge: {
                '50+50': mobaPayData[0]?.goods_limit.reached_limit,
                '150+150': mobaPayData[1]?.goods_limit.reached_limit,
                '250+250': mobaPayData[2]?.goods_limit.reached_limit,
                '500+500': mobaPayData[3]?.goods_limit.reached_limit
            }
        };

        // 3. Kirim hasil akhir sesuai format yang diminta
        res.status(200).json({
            status: true,
            creator: 'Firman Evergarden ^_^',
            data: resultData
        });

    } catch (error) {
        console.error(error); // Log error untuk debugging di server
        res.status(500).json({
            status: false,
            creator: 'Firman Evergarden ^_^',
            message: error.message || 'Terjadi kesalahan pada server'
        });
    }
});

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});