## Mnożenie SD, algorytm Bootha-McSorleya
Różnicą tym algorytmem a Bootha, jest to że ten algorytm dzieli liczbę na grupy dwucyfrowe
 i w każdym kroku, dla każdej grupy wytwarza również 2 cyfry SD. Przekodowania różnymi algorytmami mogą dać ten sam wynik.
### Przekodowanie liczby U2 na SD:
Na przykładzie liczby $(1)1000110_{U2}$:
 
1. Rozszerzamy liczbę dopisując cyfrę 0 po prawej stronie:
       $$
           (0)1000110 \mapsto 01000110.0
       $$
2. W razie potrzeby liczbę należy rozszerzyć również lewostronnie o cyfry wynikające z jej znaku (0 dla liczb
dodatnich, 1 dla ujemnych). Jesli grupy będą niepełne, należy rozszerzyć lewostronnie
3. Zaczynanamy od prawej stronie, i obliczamy cyfry kolejnej grupy. Wynikiem grupy będzie cyfra w zakresie $\lbrack -2 : 2\rbrack$ (oznaczana tutaj jako $G$) którą następnie zapisujemy w postaci dwucyfrowej. 
Konwersje z jednecyfrowego wyniku grupy G na dwucyfrowy wynik grupy G oznaczamy tutaj jako $sd(G)$ 
$$
     X_{SD_{i}}, X_{SD_{i-1}} = sd(G) = \begin{cases}
       G = -2 \mapsto -1, 0\\
       G = -1 \mapsto 0, -1\\
       G =  0 \mapsto 0, 0\\
       G = 1 \mapsto 0, 1\\
       G = 2 \mapsto 1, 0\\
    \end{cases}
$$
4. Żeby otrzymać drugą cyfrę każdej grupy mnożymy przez -2 i dodajemy dwie cyfry stojące na prawo od niej (pierwszą cyfrę grupy i drugą cyfrę poprzedniej grupy). 
Wynik grupy $G$ zapisujemy w formie dwucyfrowej $sd(G)$ i algorytm powtarzamy dla kolejnych grup.
$$
\begin{aligned}
    & G = - 2 * X_{i} + X_{i-1} + X_{i-2} \\
    & X_{SD_{i}}, X_{SD_{i-1}} = sd(G) \\
    \\
    & X_{SD_{1}}, X_{SD_{0}} = sd(- 2 * X_{1} + X_{0} + X_{-1}) \\
    & X_{SD_{1}}, X_{SD_{0}} = sd(-2 * 1 + 0 + 0) \\
    & X_{SD_{1}}, X_{SD_{0}} = sd(-2) = -1 , 0 \\
    \\
    & X_{SD_{3}}, X_{SD_{2}} = sd(- 2 * X_{3} + X_{2} + X_{1}) \\
    & X_{SD_{3}}, X_{SD_{2}} = sd(-2 * 0 + 1 + 1) \\
    & X_{SD_{3}}, X_{SD_{2}} = sd(2) = 1 , 0 \\
    & ... \\
    & (0)1000110_{U2} = 10010-10_{SD}
\end{aligned}
$$
Mnożenie przez tak przekodowany mnożnik będzie wyglądać następująco:

$$
    (M*m)_{U2} = (1)1101011 * (0)1000110 = (1)01001000010
$$

```calc-operation
{
  "operation": "Multiplication",
  "algorithm": "BoothMcSorley",
  "base": 2,
  "operands": ["(1)101011", "(0)1000110"]
}
```


1. MR-K, "Mnożenie w systemach uzupełnieniowych pełnych"   **[web.archive.org](https://web.archive.org/web/20100215194642/http://wk-group.net/mr-k/pliki/studia/arytmetyka/mnozenieUzup_v18.pdf)**
