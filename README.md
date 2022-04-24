# [Mielipidekysely Sovellus](https://tsoha-poll-app.herokuapp.com/)
---

Sisältö
- [Johdanto](#johdanto)
- [Toiminta](#toiminta)
- [Testaaminen](#testaaminen)
- [Huomioita Sovelluksen Käyttämisestä](#huomioita-sovelluksen-kayttamisesta)
- [Alkuperäinen vaatimusmäärittely:](#alkuperainen-vaatimusmaarittely)

---

### Johdanto

Neliöllinen äänestäminen on äänestämismenetelmä, jossa osanottaja/äänestäjä ilmaisee mieltymyksensä suunnan lisäksi voimakkuutta. Menetelmässä annetaan äänestäjälle kasa "ääniä" joita äänestä voi jakaa eri vaihtoehtojen kesken. Äänten antaminen jollekkin vaihtoehdolle menee neliöllisesti eli ensimmäinen ääni on 1^2 = 1, toinen ääni on 2^2 = 4, kolmas 3^2 = 9 jne. Äänten kallistuminen toisaalta estää äänien kasaantumista, mutta myös kannustaa kompromisseihin. Menetelmä on hyvin mielenkiintoinen ja asiaan uppoutumisen voi aloittaa tästä [Wikipedia: Quadratic voting](https://en.wikipedia.org/wiki/Quadratic_voting).

>"Quadratic voting” is a new method of polling proposed by Glen Weyl, a political economist now at Microsoft Research. Whereas a normal poll might ask you whether you agree or disagree with a set of issues, one conducted with quadratic voting gives poll-takers a budget of “voice credits”, which they can spend to agree or disagree with each issue. Poll-takers can cast multiple votes in favour of or opposed to each issue, but each vote costs more credits than the last. - [The Economist](https://www.economist.com/interactive/2021/12/18/quadratic-voting)

---

### Toiminta

Sovelluksella voi toteuttaa mielipidekyselyitä. Kyselyt perustuvat neliölliseen äänestämiseen (Quadratic Voting). Käyttäjät voivat luoda omia kyselyitä mihin muut käyttäjät voivat vastata. Kyselyt koostuvat yhdestä tai useammasta kysymyksestä. Sovellus on pohjimmiltaan mielipidesovellus, mutta sen on tarkoitus esitellä käyttäjälle vaihtoehtoinen tapa perinteiselle mielipidemittaukselle.

---

### Testaaminen

Sovellukseen pääsee [tästä linkistä](https://tsoha-poll-app.herokuapp.com/).

---

### Huomioita Sovelluksen Kayttamisesta

Kirjautumissivu ei tässä vaiheessa anna mitään indikaatiota kirjautumisen epäonnistumisesta. Onnistunut kirjautuminen uudelleenohjaa automaattisesti pääsivulle.

Uutta kyselyä luodessa on tärkeä lisätä viimeinenkin kysymys "add statement" napista ennen kyselyn julkaisemista "submit" napilla. Muulloin viimeinen kysymys jää pois julkaisusta.

Yleisestikin aplikaatiosta puuttuu paljon käyttäjälle näkyviä viestejä/vihjeitä tapahtumista. Hyvä uutinen on, että aplikaatiossa on hyvä runko näiden toteuttamiseen, mutta tähän versioon ne eivät ehtineet.

---

### Projektin tilanne

Tässä versiossa olevat toiminnot:
- Käyttäjä voi
    - luoda tunnuksen.
    - kirjautua sisään ja ulos.
    - luoda oman kyselyn.
    - vastata kyselyihin.
    - piilottaa oman kyselyn muilta käyttäjiltä.
    - arvioida muiden kyselyitä.
    - nähdä kyselyyn vastanneiden määrän.
    - nähdä muiden käyttäjien antaman yleisarvosanan.
    - saada perus tietoa neliöllisestä äänestämisestä.

Seuraavan versiot toivotut ominaisuudet:
- Tyyliä ja käytettävyyttä.
- Statistiikkaa kyselyiden tuloksista.
- Palautelaatikko.

---

### Alkuperainen Vaatimusmaarittely:

- Käyttäjä voi luoda uuden tunnuksen sekä kirjautua sisään ja ulos.
- Etusivulla käyttäjä näkee aktiiviset kyselyt joista näkyy kyselyn otsikko sekä vastausten määrä.
- Käyttäjä voi vastata näihin kyselyihin.
- Kyselyn lopussa annetaan yhteenveto kuinka käyttäjän vastaukset vertautuivat muiden käyttäjien vastauksiin.
- Uuden kyselyn voi tehdä kyselyn luontityökalulla, johon kirjataan otsikko, kysymykset ja äänestäjän "kredittien" määrän.
- Käyttäjä pystyy poistamaan luomansa kyselyn.
- Suosituimmat kyselyt ja vastaajat ovat tilastoitu käyttäjien nähtäväksi.
- Sovelluseen kuuluu infosivu jossa lyhyesti esitellään kyslyssä käytetty menetelmä (Quadratic voting).