# Uzupełnienia liczb
Uzupełnienie liczby to sposób reprezentacji który umożliwia wykonywanie róznych działań na liczbach ujemnych i dodatnich. Oznaczamy je przez kreskę nad liczbą: $\overline{A}=(0)A$.
## Liczby dodatnie
Uzupełnienie liczby pozytywnej ta sama liczba z dopisanym $(0)$ z przodu np. $\overline{12}=(0)12$. (0) oznacza że wszystkie pozycje w lewo mają wartość 0.

## Liczby ujemne
Uzupełnienie liczby ujemnej to w skrócie to liczba z zanegowanymi wszystkimi cyframi powiększona o 1.
Cyfrę negujemy przez odjęcie tej cyfry od największej cyfry możliwej w danej podstawie,
 np. jeśli chcemy zanegować $6_{10}$, największą cyfrą w podstawie 10 jest 9, więc uzupełnieniem jest 3 $(9-6=3)$, dla $1_{2}$, negacją będzie 0 $(1-1=0)$.
 Po zanegowaniu liczby dodajemy do niej zwyczajnie 1 (z uwzględnieniem wszystkich przeniesień jakie z tego wynikną).
  Po dodaniu, bierzemy wszystkie cyfry które powstały po zanegowaniu i dodaniu i dopisujemy największą cyfrę w danej podstawie owiniętą w nawiasy: (np. dla podstawy 10 to (9)).
  Przykładowo, jeśli chcemy obliczyć uzupełnie dla $\overline{-24874612.97_{10}}=?$:
 ```calc-cconv
 {
   "base": 10,
   "representation" : "-24874612.97"
 }
 ```
Po zanegowaniu wszystkich pozycji otrzymujemy $75125387.02$, po dodaniu 1 $75125387.02$ a po zapisaniu z rozszerzeniem $(9)75125387.02$.
## Skąd się to bierze?
Załóżmy że chcemy wykonać działanie $15 -17$. 
Wynik takiego działania to oczywiście -2, ale jeśli spróbujemy zastosować pozycyjne odejmowanie, dostatniemy dziwny wynik:
```calc-operation
{
  "operation": "Subtraction",
  "algorithm": "Default",
  "base": 10,
  "operands": ["15", "17"]
}
```
Na poniważ na pozycji 0 musieliśmy pożyczyć z pozycji 1, na pozycji 1 jest teraz 0 i nie można odjąć, 
więc konieczna jest pożyczka z następnej pozycji - pozycja taka nie istnieje, więc zakładamy że jest tam 0, 
po pożyczce z pozycji 2 odjemneej, zamiast 0 znajdzie się tam 9.
Nie możemy pożyczyć z 0, więc musimy najpierw pożyczyć z następnej pozycji, na której też jest 0 - zakładając że wszystkie takie pożyczyki możemy wykonwać,
 otrzymamy na pozycjach odjemnej większych od 1 nieskończony ciąg 9 od któegeo odejmujemy nieskończony ciąg zer. 
 Po odjęciu tych pozycji otrzymalibyśmy $...99998$. 
 Możemy oznaczyć taki ciąg jako $(9)8$ - taki sposób zapisu nazywany jest właśnie uzupełnienime liczby.
  
 Wartość takiego uzupełnienia to -2 $(15-17=-2)$.
## Do czego się to przydaje? 
Uzupełnienie zapewnia spójny zapis dla ujemnych i dodatnih liczb, więc można stosować te same algorytmy dodawania, odejmowania czy mnożenia.
Na przykład, jeśli chcielibyśmy dodać $981_{10}$ i $-456_{10}$ to nie było to wcześniej możliwe za pomocą dodawania, trzeba by było skorzystać z odejmowania. 
```calc-operation
{
  "operation": "Subtraction",
  "algorithm": "Default",
  "base": 10,
  "operands": ["981", "456"]
}
```
Jeśli zapiszemy te liczby jako ich uzupełnienia $(0)981, (9)544$, możemy je dodać:
```calc-operation
{
  "operation": "Addition",
  "algorithm": "Default",
  "base": 10,
  "operands": ["981", "-456"]
}
```
