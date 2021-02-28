# Mnożenie odtwarzające
Algorytm ten (znany również pod nazwą "mnożenia z rozszerzeniem mnożnika"), w odróżnieniu od zwykłego, operuje wyłącznie na uzupełnieniach liczb.
Algorytm wykonujemy w kilku krokach:

1. Lewostronne rozszerzenie uzupełnienia mnożnej $M$ o kilka pozycji. Dla pewności można rozszerzyć o ilość cyfr mnożnika $m$, 

2. Lewostronne rozszerzenie uzupełnienia mnożnika $m$ o jedną pozycje

3. Wykonywanie normalnego mnożenia (jakby to był system naturalny ale z uwzględnieniem nieskończonego
rozszerzenia) na wszystkich cyfrach mnożnika poza cyfrą rozszerzenia,

4. Jeśli cyfrą rozszerzenia jest -1 (największa cyfra w danym systemie, np. dla $X_{10}$ to $9$) to powinniśmy dodać również uzupełnienie
mnożnej $\overline{M}$ przesunięte o ilość cyfr mnożnika (nie licząc cyfry rozszerzenia), jeśli jest 0, nic więcej nie robimy
## Dodatni mnożnik
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

## Ujemny mnożnik
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
