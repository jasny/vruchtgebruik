# Vruchtgebruik Rekentool Opdracht

* De [backend](/backend) is een .NET Core Web Api project.
* De [frontend](/frontend) is een Angular web applicatie.

## Introductie

De Vruchtgebruik rekentool berekent de waarde van vruchtgebruik voor de
inkomstenbelasting in box 3. Wanneer iemand gerechtigd is tot voordelen uit een goed
is sprake van een genotsrecht, ook wel vruchtgebruik genoemd.

Onder "genotsrecht" vallen zowel persoonlijke gebruiksrechten op een onroerende zaak
(recht op gratis wonen) of op een geldbedrag (leningschuld renteloos of tegen zachte
rente) als zakelijke rechten van vruchtgebruik op aandelen (recht op dividend).

Voor de inkomstenbelasting in box 3 wordt een genotsrecht gewaardeerd op 4% van de
volle eigendomswaarde van de onderliggende zaak of het vermogensrecht,
vermenigvuldigd met een leeftijdsfactor afhankelijk van de leeftijd van de gerechtigde.

De opdracht is om een eenvoudige web applicatie te creëren om het vruchtgebruik te
berekenen op basis van een aantal ingevoerde gegevens.

## Eisen

Bouw een applicatie met een Angular front-end en een .NET Core back-end api.

- Maak een .NET Core Web Api-project aan dat de calculatie logica uitvoert die
    hieronder wordt vermeld.
- Maak een Angular-project aan voor de UI, zie ter inspiratie onderstaande
    afbeelding


## Calculatie

#### Basisformule
```
Vruchtgebruikwaarde = Eigendomswaarde x 0.04 x factor
```

De _factor_ wordt bepaald op basis van de gekozen berekeningsmethode. Voor deze
opdracht gebruiken we alleen de ‘Eén leven’ methode (maar het kan verstandig zijn om
rekening te houden met meerdere methodes)

#### Berekening op basis van één leven (EenLeven)

Factor wordt bepaald door twee parameters: leeftijd en geslacht

#### Voor vrouwen

Als het geslacht vrouw is, wordt de leeftijd met 5 jaar verlaagd (Wet _UBIB 20 01 art. 19 lid
7_).

De factor wordt bepaald aan de hand van leeftijdscategorieën:

- Leeftijd <= 24 jaar: factor = 22
- Leeftijd <= 29 jaar: factor = 21
- Leeftijd >= 30 jaar: factor = 20

**NB.** De tabel is een vereenvoudiging van de werkelijkheid tbv de opdracht. De volledige
tabel is te vinden op [Artikel 19 Uitvoeringsbesluit inkomstenbelasting 2001](https://wetten.overheid.nl/jci1.3:c:BWBR0012066&hoofdstuk=5&artikel=19&z=2025-01-01&g=2025-01-01).

## Validatie

De applicatie moet onjuiste en/of onlogische input op een nette manier blokkeren.

Bijvoorbeeld: Eigendomswaarde moet positief zijn

