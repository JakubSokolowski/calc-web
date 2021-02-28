# Mnożenie odtwarzające dla U2
Algorytm identyczny jak w zwykłym mnożeniu odtwarzającym

1. Lewostronne rozszerzenie uzupełnienia mnożnej $M$ o kilka pozycji. Dla pewności można rozszerzyć o ilość cyfr mnożnika $m$, 

2. “Skanujemy” mnożnik od prawej strony aż do przedostatniej cyfry i jeśli cyfrą jest zero to dodajemy $0$ a jeśli cyfrą jest $1$ to dodajemy mnożną $M$

3. Każdą kolejną liczbę zapisujemy przesuniętą o jedną pozycję w lewo w stosunku do liczby poprzedniej (jak
w normalnym mnożeniu),

4. Jeśli ostatnią cyfrą mnożnika jest 1 to zamiast dodawać na tym przesunięciu mnożną $M$, dodajemy uzupełnienie $\overline{M}$ (jeśli
jest 0 to nic nie dodajemy)

## Dodatni mnożnik

Przykład z cyfrą rozszerzenia 0 dla $X_{U2}$:

$$
    (M*m)_{U2} = (1)1101011 * (0)1000110 = (1)01001000010
$$

$$
    (M*m)_{10} = -21 * 70 = -1470
$$


```calc-operation
{
  "operation": "Multiplication",
  "algorithm": "WithExtension",
  "base": 2,
  "operands": ["(1)1101011", "(0)1000110"]
}
```

## Ujemny mnożnik

Przykład z cyfrą rozszerzenia 1 dla $X_{U2}$:

$$
    (M*m)_{U2} = (1)1101011 * (1)1000110 = (0)10011000010
$$

$$
    (M*m)_{10} = -21 * -58 = 1218
$$

```calc-operation
{
  "operation": "Multiplication",
  "algorithm": "WithExtension",
  "base": 2,
  "operands": ["(1)1101011", "(1)1000110"]
}
```
