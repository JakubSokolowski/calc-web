# Mnożenie
Operandy mnożenia to mnożna (*en. multiplicand* oznaczona jako $m$) i mnożnik (*en. multiplier* - oznaczana jako jako $M$ ) - mnożymy mnożną przez mnożnik.
Wynik mnożenia nazywamy iloczynem (*en. product* - oznaczany przez $P$).
 Mnożenie dla różnych podstaw można zrealizować wieloma algorytmami, a dla liczb binarnych są jeszcze inne, specjalne algorytmy.
## Mnożenie "szkolne"
### Algorytm
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
```calc-operation
{
  "operation": "Multiplication",
  "algorithm": "Default",
  "base": 10,
  "operands": ["100", "20"]
}
```
## Mnożenie odtwarzające
## Mnożenie nieodtwarzające
