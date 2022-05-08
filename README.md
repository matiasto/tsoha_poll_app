# [Mielipidekysely Sovellus](https://tsoha-poll-app.herokuapp.com/)
---

Sisältö
- [Johdanto](#johdanto)
- [Toiminta](#toiminta)
- [Testaaminen](#testaaminen)
- [Käyttäminen](#kayttaminen)
- [Huomioita sovelluksen käyttämisestä](#huomioita-sovelluksen-kayttamisesta)
- [Projektin tilanne](#projektin-tilanne)
- [Alkuperäinen vaatimusmäärittely:](#alkuperainen-vaatimusmaarittely)

---

<h2 id="johdanto">
Johdanto
</h2>


Neliöllinen äänestäminen on äänestämismenetelmä, jossa osanottaja/äänestäjä ilmaisee mieltymyksensä suunnan lisäksi voimakkuutta. Menetelmässä annetaan äänestäjälle kasa "ääniä" joita äänestä voi jakaa eri vaihtoehtojen kesken. Äänten antaminen jollekkin vaihtoehdolle menee neliöllisesti eli ensimmäinen ääni on 1^2 = 1, toinen ääni on 2^2 = 4, kolmas 3^2 = 9 jne. Äänten kallistuminen toisaalta estää äänien kasaantumista, mutta myös kannustaa kompromisseihin. Menetelmä on hyvin mielenkiintoinen ja asiaan uppoutumisen voi aloittaa tästä [Wikipedia: Quadratic voting](https://en.wikipedia.org/wiki/Quadratic_voting).

>"Quadratic voting” is a new method of polling proposed by Glen Weyl, a political economist now at Microsoft Research. Whereas a normal poll might ask you whether you agree or disagree with a set of issues, one conducted with quadratic voting gives poll-takers a budget of “voice credits”, which they can spend to agree or disagree with each issue. Poll-takers can cast multiple votes in favour of or opposed to each issue, but each vote costs more credits than the last. - [The Economist](https://www.economist.com/interactive/2021/12/18/quadratic-voting)

---

<h2 id="toiminta">
Toiminta
</h2>

Sovelluksella voi toteuttaa mielipidekyselyitä. Kyselyt perustuvat neliölliseen äänestämiseen (Quadratic Voting). Käyttäjät voivat luoda omia kyselyitä mihin muut käyttäjät voivat vastata. Kyselyt koostuvat yhdestä tai useammasta kysymyksestä. Sovellus on pohjimmiltaan mielipidesovellus, mutta sen on tarkoitus esitellä käyttäjälle vaihtoehtoinen tapa perinteiselle mielipidemittaukselle.

---

<h2 id="testaaminen">
Testaaminen
</h2>

Sovellukseen pääsee [tästä linkistä](https://tsoha-poll-app.herokuapp.com/).

---

<h2 id="kayttaminen">
Käyttäminen
</h2>

Kirjauduttua sisään käyttäjä näkee muiden tekemiä kyselyitä.

Halutessaan hän voi vastata näihin kyselyihin. Vastauksen jälkeen kysely katoaa etusivulta ja ilmestyy profiili sivun my votes osioon.

My votes osiossa käyttäjä voi käydä katsomassa miten omat vastaukset vertautuivat muihin. Lisäksi käyttäjä voi jättää kyselystä arvostelun.

Käyttäjä voi myös luoda oman kyselyn Create poll osiossa. Luotuaan kyselyn, käyttäjä voi hallinoida, sekä tarkastella kyselyä oman profiilin kautta.

Oman profiilin my polls osiossa voi tarkastella vastauksien yleisiä tietoja, sekä arvosteluja mitä kyselyyn vastanneet käyttäjät ovat mahdollisesti jättäneet.

---

<h2 id="huomioita-sovelluksen-kayttamisesta">
Huomioita Sovelluksen Käyttämisestä
</h2>

Käyttäjä ei näe omia kyselyitä etusivulla, mutta voi hallita niitä profiili sivulta.

Uutta kyselyä luodessa on tärkeä lisätä viimeinenkin kysymys "add statement" napista ennen kyselyn julkaisemista "submit" napilla. Muulloin viimeinen kysymys jää pois julkaisusta.

---

<h2 id="projektin-tilanne">
Projektin tilanne
</h2>

Tässä versiossa olevat toiminnot:
- Käyttäjä voi
    - luoda tunnuksen.
    - kirjautua sisään ja ulos.
    - luoda oman kyselyn.
    - vastata kyselyihin.
    - piilottaa oman kyselyn muilta käyttäjiltä.
    - arvioida muiden kyselyitä.
    - tarkastella omiin kyselyihin annettuja arvosteluja.
    - nähdä kyselyyn vastanneiden määrän.
    - nähdä yleistä statistiikkaa kyselyn tuloksista.
    - vertailla omia ääniä keskiarvoon ja mediaaniin
    - nähdä muiden käyttäjien antaman yleisarvosanan.
    - saada perus tietoa neliöllisestä äänestämisestä.

Keskeneräiset ominaisuudet:
- Varsinkin tyyli on erittäin kesken.
- Tietokantaan tehdyt kyselyt voisivat olla paljon optimoidumpia.
- Client puolella on vielä paljon toistoa koodissa.
- Vakautta ja sitä kautta virheiden käsittelyä voisi parantaa.

---

<h2 id="alkuperainen-vaatimusmaarittely">
Alkuperäinen Vaatimusmäärittely
</h2>

- Käyttäjä voi luoda uuden tunnuksen sekä kirjautua sisään ja ulos.
- Etusivulla käyttäjä näkee aktiiviset kyselyt joista näkyy kyselyn otsikko sekä vastausten määrä.
- Käyttäjä voi vastata näihin kyselyihin.
- Kyselyn lopussa annetaan yhteenveto kuinka käyttäjän vastaukset vertautuivat muiden käyttäjien vastauksiin.
- Uuden kyselyn voi tehdä kyselyn luontityökalulla, johon kirjataan otsikko, kysymykset ja äänestäjän "kredittien" määrän.
- Käyttäjä pystyy poistamaan luomansa kyselyn.
- Suosituimmat kyselyt ja vastaajat ovat tilastoitu käyttäjien nähtäväksi.
- Sovelluseen kuuluu infosivu jossa lyhyesti esitellään kyslyssä käytetty menetelmä (Quadratic voting).