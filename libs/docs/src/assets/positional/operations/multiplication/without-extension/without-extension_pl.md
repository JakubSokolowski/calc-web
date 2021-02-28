# Mnożenie nieodtwarzające
Zwany również mnożeniem bez rozszerzania mnożnika. Algorytm wykonujemy w kilku krokach:

1. Lewostronne rozszerzenie uzupełnienia mnożnej $M$ o kilka pozycji. Dla pewności można rozszerzyć o ilość cyfr mnożnika $m$

2. Wykonywanie normalnego mnożenia (jakby to był system naturalny ale z uwzględnieniem nieskończonego
rozszerzenia) na wszystkich cyfrach mnożnika poza cyfrą rozszerzenia

3. W ostatnim kroku dodajemy mnożną pomnożoną przez wartość ostatniej cyfry mnożnika, przesuniętą o jeden mniej niż ilość cyfr mnożnika.
   Wartość cyfry w systemie uzupełnieniowym będzie ujemna - np. W U10 wartość cyfry 7 to $-(10 - 7)=-3$, więc dodajemy -3 * mnożna  ($-3M$) 
   czyli 3 * uzupełnienie mnożnej $(3 \overline{M})$.
   
## Dodatni mnożnik
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
## Ujemny mnożnik
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
