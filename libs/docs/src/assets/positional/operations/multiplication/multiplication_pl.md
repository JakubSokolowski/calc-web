# Mnożenie
Operandy mnożenia to mnożna (*en. multiplicand* oznaczona jako $M$) i mnożnik (*en. multiplier* - oznaczana jako jako $m$ ) - mnożymy mnożną przez mnożnik.
Wynik mnożenia nazywamy iloczynem (*en. product* - oznaczany przez $P$).
 Mnożenie dla różnych podstaw można zrealizować wieloma algorytmami, a dla liczb binarnych są jeszcze inne, specjalne algorytmy.
## Mnożenie "szkolne"
Mnożenie realizujemy w dwóch etapch - wytworzenie półproduktów poprzez pomnożenie poszczególnych cyfr mnożnej przez mnożnik oraz dodanie tych półproduktów.

```calc-operation
{
  "operation": "Multiplication",
  "algorithm": "Default",
  "base": 10,
  "operands": ["6574.321", "12.998"]
}
```
Cyfry mnożnej mnożymy przez kolejne pozycje mnożnika zaczynając od najmłodszej, a następnie wynik zapisujemy pod operandami,
 przesuwając każdy kolejny wynik o jedną pozycję w lewo. Następnie przesunięte wyniki dodajemy, 
 i dostosowujemy przecinek wynika - przesuwamy w lewo o sumę ilości cyfr ułamków mnożnej i mnożnika.
```calc-operation
{
  "operation": "Multiplication",
  "algorithm": "Default",
  "base": 2,
  "operands": ["1001101", "1101"]
}
```
Po najechaniu myszką na daną cyfre pojawi się więcej szczegółów: wyniki dla rzędów po najechaniu na cyfry mnożnika,
  wyniki dla poszczególnych pozycji po najechaniu na cyfry półproduktów i wyniki pozycji dodawania po najechaniu na cyfry wyników.
### Mnożenie cyfr ujemnych
Jeśli jakiś operand jest ujemny, znak wyniku jest uwzględniany dopiero po pomnożeniu. Bezpośrednie mnożenie uzupełnienia liczb tą metodą nie jest możliwe.
### Różnice w implementacji
Dla uproszczenia implementacji, cyfry części ułamkowej operandów są zawsze wyrównywane - jeśli mnożymy mnożną $76.12$ przez mnożnik $40$ 
to dodane zostaną brakujące 0.
```calc-operation
{
  "operation": "Multiplication",
  "algorithm": "Default",
  "base": 10,
  "operands": ["76.12", "40"]
}
```
 Dodatkowo, mnożenia przez cyfrę zero również są pokazywane - nie ma pomijania pozycji podczas mnożenia i dopisywania zer do wyniku.
## Mnożenie odtwarzające
Algorytm ten (znany również pod nazwą "mnożenia z rozszerzeniem mnożnika"), w odróżnieniu od zwykłego, operuje wyłącznie na uzupełnieniach liczb.
Algorytm wykonujemy w kilku krokach:

1. Lewostronne rozszerzenie uzupełnienia mnożnej $M$ o kilka pozycji. Dla pewności można rozszerzyć o ilość cyfr mnożnika $m$, 

2. Lewostronne rozszerzenie uzupełnienia mnożnika $m$ o jedną pozycje

3. Wykonywanie normalnego mnożenia (jakby to był system naturalny ale z uwzględnieniem nieskończonego
rozszerzenia) na wszystkich cyfrach mnożnika poza cyfrą rozszerzenia,

4. Jeśli cyfrą rozszerzenia jest -1 (największa cyfra w danym systemie, np. dla $X_{10}$ to $9$) to powinniśmy dodać również uzupełnienie
mnożnej $\overline{M}$ przesunięte o ilość cyfr mnożnika (nie licząc cyfry rozszerzenia), jeśli jest 0, nic więcej nie robimy
### Odtwarzające - dodatni mnożnik
Przykład z cyfrą rozszerzenia 0 dla $X_{10}$:

$$
    M*m = (9)6745 * (0)8123 = (9)73559635
$$

```calc-operation
{
  "operation": "Multiplication",
  "algorithm": "WithExtension",
  "base": 10,
  "operands": ["(9)6745", "(0)8123"]
}
```

### Odtwarzające - ujemny mnożnik
Przykład z cyfrą rozszerzenia -1 dla $X_{10}$, te same operandy tylko w innej kolejności, 
ponieważ mnożnik jest ujemny trzeba dodać uzupełnienie mnożnej żeby wynik był ten sam.

$$
    M*m = (0)8123 * (9)6745 = (9)73559635
$$

Mnożenie w systemie dziesętnym, cyfrą rozszerzenia mnożnika jest $(9)$ - jest to -1, największa cyfra w tym systemie,
 więc dodajemy uzupełnienie mnożnej $\overline{M}=(9)1877$, przesunięte o ilość cyfr mnożnika bez cyfry rozszerzenia - 4 pozycje.

```calc-operation
{
  "operation": "Multiplication",
  "algorithm": "WithExtension",
  "base": 10,
  "operands": [ "(0)8123", "(9)6745"]
}
```
Kolejny przykład, tym razem dla $X_{8}$:

$$
    M*m = (0)3156 * (9)6423 = (7)3230052
$$

```calc-operation
{
  "operation": "Multiplication",
  "algorithm": "WithExtension",
  "base": 8,
  "operands": ["(0)3156", "(7)6423"]
}
```
## Mnożenie nieodtwarzające
Zwany również mnożeniem bez rozszerzania mnożnika. Algorytm wykonujemy w kilku krokach:

1. Lewostronne rozszerzenie uzupełnienia mnożnej $M$ o kilka pozycji. Dla pewności można rozszerzyć o ilość cyfr mnożnika $m$

2. Wykonywanie normalnego mnożenia (jakby to był system naturalny ale z uwzględnieniem nieskończonego
rozszerzenia) na wszystkich cyfrach mnożnika poza cyfrą rozszerzenia

3. W ostatnim kroku dodajemy mnożną pomnożoną przez wartość ostatniej cyfry mnożnika, przesuniętą o jeden mniej niż ilość cyfr mnożnika.
   Wartość cyfry w systemie uzupełnieniowym będzie ujemna - np. W U10 wartość cyfry 7 to $-(10 - 7)=-3$, więc dodajemy -3 * mnożna  ($-3M$) 
   czyli 3 * uzupełnienie mnożnej $(3 \overline{M})$.
   
### Nieodtwarzające - dodatni mnożnik
Ten sam przykład co dla mnożenia z rozszerzeniem, z cyfrą rozszerzenia 0 dla $X_{10}$:

$$
    M*m = (9)6745 * (0)8123 = (9)73559635
$$

Mnożnik jest uzupełnieniem dodatnie liczby, więc wartością cyfry mnożnika jest ta cyfra. 
Tutaj ostatnią cyfrą jest 8, więc tak jak w przypadku normalnego mnożenia, dodajemy 8 razy mnożnik.

```calc-operation
{
  "operation": "Multiplication",
  "algorithm": "WithoutExtension",
  "base": 10,
  "operands": ["(9)6745", "(0)8123"]
}
```
### Nieodtwarzające - ujemny mnożnik
Ten sam przykład z odwrotną kolejnością operandów:

$$
    M*m = (0)8123 * (9)6745 = (9)73559635
$$

Mnożnik jest uzupełnieniem ujemnej liczby, więc wartością cyfry mnożnika jest:

$$
 -(podstawa - cyfra) = -(10 - 6) = -4
$$

Należy więc dodać 4 * uzupełnienie mnożnej:
$$ 
    4*\overline{M} = 4 * (9)1877 = (9)67508
$$
```calc-operation
{
  "operation": "Multiplication",
  "algorithm": "WithoutExtension",
  "base": 10,
  "operands": [ "(0)8123", "(9)6745"]
}
```
