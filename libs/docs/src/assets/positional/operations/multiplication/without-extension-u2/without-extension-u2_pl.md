# Mnożenie nieodtwarzające dla U2
Algorytm wygląda następująco:

1. “Skanujemy” mnożnik $m$ od prawej aż do przedostatniej cyfry,

2. Jeśli cyfrą jest $0$ to dodajemy $0$ (mające tyle cyfr co mnożna $M$) z zanegowanym najstarszym bitem (nazywany też najbardziej znaczącą pozycją, oznaczany przez $MSP$), jeśli $1$ to
dodajemy mnożną $m$ z zanegowanym najstarszym bitem.

3. W mnożeniu przez ostatnią cyfrę, jeśli ostatnia cyfra to $1$ to dodajemy uzupełnienie mnożnej $\overline{M}$ z zanegowanym ostatnim bitem, a jeśli
cyfra to $0$, to dodajemy zero z jedynka na najstarszym bicie.

4. Jako ostatnią dodajemy korektę w postaci liczby składającej się z cyfry $1$ na pozycji takiej jak najstarszy bit
mnożnej $M$ i z cyfry $1$ na pozycji o jeden dalszej niż cyfra zanegowana w po poprzednim mnożeniu

Dzięki negacji pierwszych cyfr nie uwzględniamy rozszerzenia przy dodawaniu

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
  "algorithm": "WithoutExtension",
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
  "algorithm": "WithoutExtension",
  "base": 2,
  "operands": ["(1)1101011", "(1)1000110"]
}
```

# Źródła

1. MR-K, "Mnożenie w systemach uzupełnieniowych pełnych"   **[web.archive.org](https://web.archive.org/web/20100215194642/http://wk-group.net/mr-k/pliki/studia/arytmetyka/mnozenieUzup_v18.pdf)**

