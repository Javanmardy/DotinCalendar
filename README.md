# 🎯 Cheat Sheet — OOP / SOLID / Patterns

## 1) SRP — Single Responsibility

**تعریف:** هر کلاس فقط یک مسئولیت و یک دلیل برای تغییر.
**نشانهٔ بد:** متدهای بی‌ربط در یک کلاس.

```java
// ❌ بد
class Invoice {
  void calculate() {}
  void saveToDb() {}
  void print() {}
}

// ✅ خوب
class InvoiceCalculator { void calculate() {} }
class InvoiceRepository { void saveToDb() {} }
class InvoicePrinter   { void print() {} }
```

---

## 2) OCP — Open/Closed (اوپن‌کلوز)

**تعریف:** برای توسعه باز، برای تغییر بسته.
**ایدهٔ کلیدی:** از abstraction و پلی‌مورفیسم استفاده کن؛ نه if/else روی نوع.

```java
interface Shape { double area(); }
class Circle implements Shape { double r; Circle(double r){this.r=r;} public double area(){return Math.PI*r*r;} }
class Rect   implements Shape { double w,h; Rect(double w,double h){this.w=w;this.h=h;} public double area(){return w*h;} }

class AreaCalculator {
  double calc(Shape s){ return s.area(); } // بدون if/else
}
```

---

## 3) Strategy Pattern

**مسئله:** الگوریتم قابل تعویض باشد (runtime).
**کلید:** ترکیب (Composition) با اینترفیس استراتژی.

```java
interface SortStrategy { void sort(int[] a); }
class QuickSort implements SortStrategy { public void sort(int[] a){ /* ... */ } }
class MergeSort implements SortStrategy { public void sort(int[] a){ /* ... */ } }

class Sorter {
  private SortStrategy s;
  Sorter(SortStrategy s){ this.s = s; }
  void setStrategy(SortStrategy s){ this.s = s; }
  void sort(int[] a){ s.sort(a); }
}

// استفاده:
Sorter sorter = new Sorter(new QuickSort());
sorter.sort(new int[]{3,1,2});
sorter.setStrategy(new MergeSort());
```

---

## 4) Template Method (برای جلوگیری از Duplicate Pipelines)

**مسئله:** اسکلت ثابت + قدم‌های متغیر.
**کلید:** ارث‌بری و متد قالب.

```java
abstract class FileProcessor {
  final void process(){ open(); read(); close(); }
  void open(){ System.out.println("open"); }
  abstract void read();
  void close(){ System.out.println("close"); }
}
class TextProc extends FileProcessor { void read(){ System.out.println("read txt"); } }
class CsvProc  extends FileProcessor { void read(){ System.out.println("read csv"); } }
```

---

## 5) Mediator Pattern

**مسئله:** وابستگیِ تنگاتنگ میان چند جزء (tightly-coupled).
**کلید:** همه با یک میانجی صحبت کنند.

```java
interface Mediator { void notify(Component c, String ev); }
abstract class Component { protected Mediator m; Component(Mediator m){this.m=m;} }

class TextBox extends Component {
  String text=""; TextBox(Mediator m){ super(m); }
  void set(String t){ text=t; m.notify(this,"textChanged"); }
}
class Button extends Component { Button(Mediator m){ super(m); } void click(){ m.notify(this,"click"); } }

class Dialog implements Mediator {
  TextBox name = new TextBox(this);
  Button  ok   = new Button(this);
  public void notify(Component c,String ev){
    if(c==ok && ev.equals("click")){
      System.out.println(name.text.isEmpty()?"Enter name!":"Submit "+name.text);
    }
  }
}
```

---

## 6) Observer Pattern

**مسئله:** یک منبع تغییر می‌کند و چند مصرف‌کننده باخبر شوند (publish/subscribe).
**کلید:** Subject لیستی از observers نگه می‌دارد.

```java
interface Observer { void update(int price); }
interface Subject  { void attach(Observer o); void setPrice(int p); }

class Stock implements Subject {
  private List<Observer> obs = new ArrayList<>();
  private int price;
  public void attach(Observer o){ obs.add(o); }
  public void setPrice(int p){ price=p; obs.forEach(o->o.update(price)); }
}
class MobileApp implements Observer { public void update(int p){ System.out.println("New price: "+p); } }

// استفاده:
Stock s = new Stock(); s.attach(new MobileApp()); s.setPrice(120);
```

---

## 7) State Pattern

**مسئله:** رفتار شیء وابسته به وضعیت است؛ if/switchهای زیاد بدبو می‌شوند.
**کلید:** هر وضعیت یک کلاس.

```java
interface PlayerState { void play(Player p); void pause(Player p); }
class Player {
  PlayerState st = new Stopped();
  void set(PlayerState s){ st=s; }
  void play(){ st.play(this); } void pause(){ st.pause(this); }
}
class Stopped implements PlayerState {
  public void play(Player p){ System.out.println("Start"); p.set(new Playing()); }
  public void pause(Player p){ System.out.println("Can't pause"); }
}
class Playing implements PlayerState {
  public void play(Player p){ System.out.println("Already"); }
  public void pause(Player p){ System.out.println("Paused"); p.set(new Stopped()); }
}
```

---

## 8) Package (پکیج) در جاوا

**هدف:** سازمان‌دهی کد، مدیریت دسترسی، جلوگیری از name clash.
**دسترسی‌ها:** `public`, `protected`, **package-private**(پیش‌فرض)، `private`.

**ساختار و نمونه:**

```
src/
 └─ com/example/billing/
     ├─ Invoice.java
     └─ TaxCalculator.java
```

```java
// بالا‌ترین خط فایل‌ها
package com.example.billing;

public class TaxCalculator { public double calc(double amount){ return amount*0.09; } }

// فایل دیگر در همان پکیج (به پیش‌فرض‌ها دسترسی دارد)
package com.example.billing;
class Invoice { double total; /* ... */ }
```

> نکته: کلاس‌های داخل یک پکیج به اعضای **package-private** هم دسترسی دارند؛ بیرونی‌ها ندارند.

---

## 9) Inheritance vs Composition (خلاصهٔ کاربردی)

* **Inheritance (is-a):** وقتی واقعاً «X یک نوع Y است». پلی‌مورفیسم در سلسله‌مراتب.
* **Composition (has-a):** وقتی «X دارای Y است» و می‌خواهی رفتارها را تعویض‌پذیر نگه داری (اغلب بهتر برای OCP/LSP/تست).

```java
// Composition با Strategy بهتر از ارث‌بری در بسیاری سناریوها
class Car {
  Engine engine; Car(Engine e){ this.engine=e; }
  void drive(){ engine.start(); }
}
interface Engine{ void start(); }
class PetrolEngine implements Engine{ public void start(){ System.out.println("vroom"); } }
```

---

## 10) بوی بد کد و علاج سریع

* Duplicate Code → Template / Strategy / Extract Method
* Tight Coupling → Mediator, Interfaces, DI
* Long Method → Extract Method
* Flag-based State → State Pattern
* Primitive Obsession → Value Object

---

