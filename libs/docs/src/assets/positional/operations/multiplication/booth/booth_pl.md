## Mnożenie SD, algorytm Bootha
Przekodowanie SD polega na reprezentacji danej liczby jako na cyfy ze znakiem, np. liczba w U2 zostanie zakodowana za pomocą cyfr 0, 1 i -1. . Algorytm mnożenia z przekodowaniem SD wygląda następująco:

1. Mnożnik $m$ przekodowujemy z systemu $U2$ na $SD$
2. Zaczynamy od prawej strony liczby SD i “skanujemy” kolejne cyfry:
    - jeśli 0 to dodajemy 0
    - jeśli -1 to dodajemy uzupełnienie mnożnej $\overline{M}$
    - jeśli 1 to dodajemy mnożną $M$

Algorytmy SD nie różnią się samym sposobem mnożenia tylko algorytmem przekodowania mnożnika z U2 na SD (krok #1). 

### Algorytm Bootha
Pierwszym takim przekodowaniem jest algorytm Bootha, który realizujemy następująco:
Na przykładzie liczby $(1)1000110_{U2}$:

1. Rozszerzamy liczbę dopisując cyfrę 0 po prawej stronie:
    $$
        (0)1000110 \mapsto 01000110.0
    $$
2. Zaczynamy od prawej strony i obliczamy kolejne cyfry po jednej
3. Żeby otrzymać cyfrę w kodzie SD na pozycji i, odejmujemy od cyfry w U2 na pozycji $i-1$, cyfrę na pozycji $i$
    $$
        X_{SD_{i}} = X_{i-1} - X_{i} \newline
        X_{SD_{0}} = X_{-1} - X_{0} = 0 - 0 = 0  \newline
        X_{SD_{1}} = X_{0} - X_{1} =  0 - 1 = -1 \newline
        X_{SD_{2}} = X_{1} - X_{2} = 1 - 1 = 0 \newline
        ... \newline
        (0)1000110_{U2} = 1-10010-10_{SD}
    $$

Mnożenie przez tak przekodowany mnożnik będzie wyglądać następująco:

$$
    (M*m)_{U2} = (1)1101011 * (0)1000110 = (1)01001000010
$$

```calc-operation
{
  "operation": "Multiplication",
  "algorithm": "Booth",
  "base": 2,
  "operands": ["(1)101011", "(0)1000110"]
}
```


1. MR-K, "Mnożenie w systemach uzupełnieniowych pełnych"   **[web.archive.org](https://web.archive.org/web/20100215194642/http://wk-group.net/mr-k/pliki/studia/arytmetyka/mnozenieUzup_v18.pdf)**
