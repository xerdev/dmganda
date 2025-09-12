# API Cek Ganda & Nickname Mobile Legends

Selamat datang di dokumentasi resmi **API Cek Ganda & Nickname Mobile Legends**.  
API ini memungkinkan Anda untuk:

- Mengecek **nickname** akun Mobile Legends.  
- Melihat status **double recharge** (apakah masih tersedia atau sudah limit).  
- Mengecek **Magic Chess** recharge & weekly card.  

API ini di-host di Vercel dan dapat diakses secara publik.

**Base URL**: `https://mann-stalker.vercel.app`

---

## Endpoint

### 1. Cek Akun Mobile Legends
Cek nickname dan status double recharge akun Mobile Legends.

- **Method**: `GET`  
- **Endpoint**: `/cekml`  

#### Parameter

| Parameter | Tipe   | Deskripsi                              | Wajib? |
|-----------|--------|----------------------------------------|--------|
| `id`      | String | ID Pengguna dari akun Mobile Legends   | Ya     |
| `server`  | String | ID Server dari akun Mobile Legends     | Ya     |

#### Contoh Request
https://mann-stalker.vercel.app/cekml?id=283916287&server=9476

---

### 2. Cek Akun Magic Chess
Cek username, limit double recharge, dan weekly card pada Magic Chess.

- **Method**: `GET`  
- **Endpoint**: `/getmcgg`  

#### Parameter

| Parameter | Tipe   | Deskripsi                              | Wajib? |
|-----------|--------|----------------------------------------|--------|
| `id`      | String | ID Pengguna dari akun Magic Chess      | Ya     |
| `server`  | String | ID Server dari akun Magic Chess        | Ya     |

#### Contoh Request
https://mann-stalker.vercel.app/cekmcgg?id=6578420&server=4149

---

## Contoh Respons

### ✅ Respons Sukses (ML Biasa)
{
    "status": true,
    "creator": "Firman Evergarden ^_^",
    "data": {
        "id": "283916287",
        "server": "9476",
        "nickname": "「FE」ᴋ ɪ ʀ ɪ ɢ ᴀ ʏ ᴀ",
        "country_code": "ID",
        "country_name": "Indonesia 🇮🇩",
        "double_recharge": {
            "50+50": false,
            "150+150": false,
            "250+250": false,
            "500+500": false
        }
    }
}

### ✅ Respons Sukses (Magic Chess)
{
    "status": true,
    "creator": "Firman Evergarden ^_^",
    "data": {
        "username": "FE Magic Chess",
        "limit_reached": {
            "50+50": false,
            "150+150": true,
            "250+250": false,
            "500+500": false,
            "weekly_card": false
        }
    }
}

---

## Catatan
- Jika parameter `id` atau `server` kosong → respons `400 Bad Request`.  
- Jika akun tidak ditemukan → respons `404 Not Found`.  
- Jika server error / gagal request → respons `500 Internal Server Error`.  
