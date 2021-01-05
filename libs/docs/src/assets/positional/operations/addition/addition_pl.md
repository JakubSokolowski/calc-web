# Dodawanie

Standardowy algorytm dodawania wielocyfrowych liczb - jaki jest każdy widzi. Na przykład, żeby dodać liczby w podstawie 10:
$$
 A = 878990.10_{10}
$$
$$ 
    B = 9773.76_{10}
$$
$$
    S = A + B = ?
$$
```calc-operation
{
  "operation": "Addition",
  "algorithm": "Default",
  "base": 10,
  "operands": ["878990.10", "9773.76"]
}
```
## Wyniki na pozycji
Zaczynając od najmniej znaczącej (najmłodszej, najbardziej po prawej) pozycji, należy dodawać wszystkie cyfry na tej pozycji.
Sumę cyfr na pozycji oznaczamy przez $S_n$ gdzie n to numer pozycji. Podobnie, cyfra na pozycji liczby $A$ będzie oznaczana jako $A_n$ gdzie n to numer pozycji.
Na przykład, dla pozycji -1:
$$
    S_{-1} = 1 + 7 = 8
$$
## Przeniesienia
Jeżeli po dodaniu cyfr na pozycji wynik jest większy niż $podstawa-1$, oprócz wyniku na pozycji otrzymamy 
przeniesienie - cyfra przeniesiona z jednej kolumny do drugiej, innej, bardziej znaczącej kolumny.
Wynikiem na pozycji w takim wypadku będzie $wynik \; mod \; baza$ - jest tak w przypadku pozycji 2:
$$
    A_{2} + B_{2} = 9 + 7 = 16
$$
$$
    S_{2} = 16 \; mod \; 10 = 6
$$
$$
    A_{2} + B_{2} = S_{2} + C_{2} = 6 + 1
$$
Wynikiem na pozycji jest tzw. *"6 i jeden dalej"*. Przeniesienia w CALC oznaczane są pozycją która je wytworzyła - $1_{3}$ oznacza przeniesienie 1 z pozycji 3. 

## Przeniesienia na różne pozycje
Przy dodawaniu kilku liczb na raz, może się okazać że dodawanie na danej pozycji wytworzy przeniesienie na inną pozycję niż następną. 
Taki przypadek można łatwo zreprodukować przy dodawaniu kilku liczb binarnych.
$$
    A = B = C = 7_{(10)} = 111_{(2)}
$$
$$
    A + B + C = ?
$$

```calc-operation
{
  "operation": "Addition",
  "algorithm": "Default",
  "base": 2,
  "operands": ["111", "111", "111"]
}
```

W powyższym przypadku, pozycja suma na pozycji 1 wyniesie $1 + 1 + 1 + 1 = 4 = 100_{(2)}$,
 czyli na pozycji 2 otrzymamy 0 i przeniesienie na pozycję 3.

## Wiele przeniesień z jednej pozycji
W jeszcze innych przypadkach, dodawanie wielu liczb na pozycji może wytworzyć kilka przeniesień na różne pozycje,
 w poniższym przypadku pozycja 1 wytwarza 2 przeniesienia, na pozycję 3 i na pozycję 2.

```calc-operation
{
  "operation": "Addition",
  "algorithm": "Default",
  "base": 2,
  "operands": ["111", "111", "111", "110", "110"]
}
```

## Odejmowanie przez dodawanie
Dodawanie liczb ujemnych czyli odejmowanie można zrealizować za pomocą uzupełnienia liczby. Na przykład, żeby dodać $123$ i $-41$,
 należy obliczyć uzupełnie obu liczb i je dodać. Uzupełnienie $123$ to $(0)123$ a uzupełnienie $-41$ to $(9)59$. 

```calc-operation
{
  "operation": "Addition",
  "algorithm": "Default",
  "base": 10,
  "operands": ["123", "-41"]
}
```
 Po obliczeniu uzupełnienia dodawanie wyjonujemy normalnie, nalezy tylko pamiętać że (0) i (9) to to nieskończone rozszerzenie lewostronne,
  więc na każdej kolejnej pozycji znajdą się cyfry rozszerzenia, które należy wziąć pod uwagę przy dodawaniu.
