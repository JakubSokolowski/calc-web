# Konwersja przez bazy skojarzone

W specyficznych przypadkach można znacząco uprościć konwersję. Przypadki te to takie gdy baza do której konwertujemy jest n-tą potęgą bazy z której konwertujemy, albo na odwrót. Na przykład, można takiej metody użyć dla $(X)_{2} = (Y)_{8} = (Z)_{64}$.

## Z mniejszej bazy na większą
Przez zależności między potęgami, cyfrze w liczbie o mniejszej podstawie (A), po konwersji na większą podstawę (B) będzie przypadało $n = log_A(B)$ cyfr. Dla takich konwersji grupujemy cyfry w kolejne grupy o wielkości n, zaczynając od przecinka w lewo i w prawo. Dla ostatniej grupy może nam nie starczyć cyfr, wtedy zawsze wpisujemy 0.Przykładowo, jeśli chcemy skonwertować liczbę $1110100110.11_{2}$ na podstawę 8, każde $log_2(8) = 3$ cyfry liczby o podstawie 2 będą odpowiadały jednej cyfrze w podstawie 8. Pierwszym krokiem jest zgrupowanie cyfr po 3.

1. $1|110|100|110|.|11$→ mamy 2 grupy niepełne wstawiamy 0 aż otrzymamy 3 cyfry
2. $001|110|100|110|.|110$ → dla każdej grupy odczytujemy wartość w systemue 10 z grupy, i przypisujemy tej wartości cyfrę z (8) 
    1. $001_{(2)} = 1_{(10)} = 1_{(8)}$
    2. $110_{(2)} = 6_{(10)} = 6_{(8)}$
    3. $100_{(2)} = 4_{(10)} = 4_{(8)}$
    4. $110_{(2)} = 6_{(10)} = 6_{(8)}$
    5. $110_{(2)} = 6_{(10)} = 6_{(8)}$

    Ostateczny wynik to 1646.6

```calc-bconv
{
  "algorithm": "Associated",
  "inputBase": 2,
  "outputBase": 8,
  "representation" : "1110100110.11"
}
```
## Z większej bazy na mniejszą
Przy konwersji z większej bazy na mniejszą odwracamy proces, każdej cyfrze wejścia przypisujemy n cyfr wyjścia i konwertujemy.
```calc-bconv
{
  "algorithm": "Associated",
  "inputBase": 8,
  "outputBase": 2,
  "representation" : "1646.6"
}
```
## Do czego to jest przydatne
Dlaczego jest to przydatne? Powiedzmy że chcemy przekonwertować $36\;58\;11_{64}=(...)_2$ . 
Przy użyciu normalnego algorytmu, należałoby najpier przekonwertować na liczbę dziesiętną:
$$  
 36\;58\;11_{64}=(36*64^2)+(58*64^1)+(11*64^0)+(12*64^{-1})=151179.1875_{10}
$$
A następnie, liczbę dziesiętną na liczbę binarną, w dwóch krokach, część całkowitą:
```calc-bconv
{
  "part": "Integral",
  "algorithm": "Default",
  "inputBase": 64,
  "outputBase": 2,
  "representation" : "36 58 11.12"
}
```
Oraz część ułamkową:
```calc-bconv
{
  "part": "Fractional",
  "algorithm": "Default",
  "inputBase": 64,
  "outputBase": 2,
  "representation" : "36 58 11.12"
}
```
Po wszystkich tych działaniach, jeśli nigdzie podczas dzielenia nie zostałby popełniony błąd, otrzymany wynik to:
$$
    36\;58\;11.12_{64}=100100111010001011.0011_{2}
$$
Znacznie prościej wygląda konwersja przez bazy skojarzone:
```calc-bconv
{
  "algorithm": "Associated",
  "inputBase": 64,
  "outputBase": 2,
  "representation" : "36 58 11.12"
}
```
W tym konkretnym przypadku, jeśli tabliczki liczb 6bitowych nie znamy jeszcze na pamięć,
można użyć 2 razy baz skojarzonych: $64 \rightarrow 8 \rightarrow 2$, konwertując najpierw na podstawę 8:
```calc-bconv
{
  "algorithm": "Associated",
  "inputBase": 64,
  "outputBase": 8,
  "representation" : "36 58 11.12"
}
```
A potem na podstawę 2:
```calc-bconv
{
  "algorithm": "Associated",
  "inputBase":8,
  "outputBase": 2,
  "representation" : "447213.14"
}
```
Wynik otrzymujemy znacznie szybciej i omijamy kłopotliwe dzielenie.
$$
    36\;58\;11.12_{64}=100100111010001011.0011_{2}
$$
