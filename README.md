# 📌 Cheat Sheet — OOP / SOLID / Patterns (Bad vs Good)

## 1) SRP — Single Responsibility

* هر کلاس فقط یک مسئولیت.

```java
// ❌ Bad: چند مسئولیت در یک کلاس
class Report { void calculate(){} void saveToDb(){} void print(){} }

// ✅ Good: تفکیک مسئولیت
class ReportCalculator { void calculate(){} }
class ReportRepository { void saveToDb(){} }
class ReportPrinter   { void print(){} }
```

## 2) OCP — Open/Closed

* برای توسعه باز، برای تغییر بسته (پلی‌مورفیسم به‌جای if/else).

```java
// ❌ Bad
class AreaCalculator {
  double area(Object s){
    if(s instanceof Circle c) return Math.PI*c.r*c.r;
    if(s instanceof Rect r)   return r.w*r.h;
    return 0;
  }
}
// ✅ Good
interface Shape { double area(); }
class Circle implements Shape { double r; Circle(double r){this.r=r;} public double area(){return Math.PI*r*r;} }
class Rect   implements Shape { double w,h; Rect(double w,double h){this.w=w;this.h=h;} public double area(){return w*h;} }
class AreaCalculator { double area(Shape s){ return s.area(); } }
```

## 3) LSP — Liskov Substitution

* زیرکلاس باید بدون شکستن رفتار، جای والد بنشیند.

```java
// ❌ Bad: پرنده‌ای که نمی‌تواند fly نقض LSP
interface Bird { void fly(); }
class Penguin implements Bird { public void fly(){ throw new UnsupportedOperationException(); } }

// ✅ Good: سلسله‌مراتب درست
interface Bird2 {}
interface FlyingBird extends Bird2 { void fly(); }
class Sparrow implements FlyingBird { public void fly(){} }
class Penguin2 implements Bird2 { /* بدون fly */ }
```

## 4) ISP — Interface Segregation

* اینترفیس‌ها را خرد کن؛ اجبار متدهای بی‌ربط نداشته باش.

```java
// ❌ Bad
interface Machine { void print(); void scan(); void fax(); }
class SimplePrinter implements Machine { public void print(){} public void scan(){} public void fax(){} /* بی‌ربط‌ها بی‌استفاده */ }

// ✅ Good
interface Printer { void print(); }
interface Scanner { void scan(); }
class SimplePrinter2 implements Printer { public void print(){} }
```

## 5) DIP — Dependency Inversion

* وابستگی به abstraction، تزریق وابستگی.

```java
// ❌ Bad
class Service {
  private final MySqlDb db = new MySqlDb();
  void save(){ db.save("x"); }
}
// ✅ Good
interface Db { void save(String x); }
class MySqlDb implements Db { public void save(String x){} }
class Service2 {
  private final Db db;
  Service2(Db db){ this.db=db; }  // Constructor Injection
  void save(){ db.save("x"); }
}
```

## 6) Strategy Pattern

* الگوریتم‌های قابل تعویض در زمان اجرا (Composition).

```java
// ❌ Bad: if/else برای انتخاب الگوریتم
class SorterBad {
  void sort(int[] a, String t){ if(t.equals("quick")){/*...*/} else {/*...*/} }
}
// ✅ Good
interface SortStrategy { void sort(int[] a); }
class QuickSort implements SortStrategy { public void sort(int[] a){} }
class MergeSort implements SortStrategy { public void sort(int[] a){} }
class Sorter {
  private SortStrategy s;
  Sorter(SortStrategy s){ this.s=s; }
  void setStrategy(SortStrategy s){ this.s=s; }
  void sort(int[] a){ s.sort(a); }
}
```

## 7) Template Method Pattern

* اسکلت ثابت + قدم‌های متغیر (ارث‌بری).

```java
// ❌ Bad: کپیِ پایپ‌لاین مشابه
class TxtProcBad { void process(){ open(); readTxt(); close(); } void open(){} void readTxt(){} void close(){} }
class CsvProcBad { void process(){ open(); readCsv(); close(); } void open(){} void readCsv(){} void close(){} }

// ✅ Good
abstract class FileProc {
  final void process(){ open(); read(); close(); }
  void open(){ }
  abstract void read();
  void close(){ }
}
class TxtProc extends FileProc { void read(){ /* txt */ } }
class CsvProc extends FileProc { void read(){ /* csv */ } }
```

## 8) Mediator Pattern

* کاهش coupling بین کامپوننت‌ها؛ هماهنگی در میانجی.

```java
// ❌ Bad: اجزا مستقیماً همدیگر را صدا می‌زنند
class ButtonBad {
  TextBoxBad tb;
  ButtonBad(TextBoxBad tb){ this.tb=tb; }
  void click(){ if(tb.text.isEmpty()) System.out.println("Enter!"); }
}
class TextBoxBad { String text=""; }

// ✅ Good
interface Mediator { void notify(Component c, String ev); }
abstract class Component { protected Mediator m; Component(Mediator m){ this.m=m; } }
class TextBox extends Component { String text=""; TextBox(Mediator m){ super(m);} void set(String t){ text=t; m.notify(this,"textChanged"); } }
class Button  extends Component { Button(Mediator m){ super(m);} void click(){ m.notify(this,"click"); } }
class Dialog implements Mediator {
  TextBox name = new TextBox(this);
  Button ok = new Button(this);
  public void notify(Component c,String ev){
    if(c==ok && ev.equals("click")) System.out.println(name.text.isEmpty()?"Enter!":"Submit "+name.text);
  }
}
```

## 9) Observer Pattern

* Publish/Subscribe؛ Subject ناظرها را خبر می‌کند.

```java
// ❌ Bad: پولینگ یا چک‌کردن دستی توسط مصرف‌کننده‌ها
class DashboardBad {
  StockBad s;
  void tick(){ System.out.println("price="+s.price); }
}
class StockBad { int price; }

// ✅ Good
interface Observer { void update(int price); }
class Stock implements Subject {
  private final List<Observer> os = new ArrayList<>();
  private int price;
  public void attach(Observer o){ os.add(o); }
  public void setPrice(int p){ price=p; os.forEach(o -> o.update(price)); }
}
interface Subject { void attach(Observer o); }
class MobileApp implements Observer { public void update(int p){ System.out.println("New: "+p); } }
```

## 10) State Pattern

* رفتار وابسته به وضعیت؛ حذف if/switch روی فلگ‌ها.

```java
// ❌ Bad: فلگ‌محور
class PlayerBad {
  enum St { STOPPED, PLAYING }
  St st = St.STOPPED;
  void play(){ if(st==St.STOPPED){ System.out.println("Start"); st=St.PLAYING; } }
}

// ✅ Good
interface PlayerState { void play(Player p); }
class Player {
  PlayerState st = new Stopped();
  void set(PlayerState s){ st=s; }
  void play(){ st.play(this); }
}
class Stopped implements PlayerState { public void play(Player p){ System.out.println("Start"); p.set(new Playing()); } }
class Playing implements PlayerState { public void play(Player p){ System.out.println("Already"); } }
```

## 11) Package (پکیج جاوا)

* سازمان‌دهی و کنترل دسترسی؛ پرهیز از name clash.

```java
// ❌ Bad: بدون پکیج، همه در default package
class TaxCalculatorBad { /* ... */ }

// ✅ Good: ساختاردهی
// فایل: src/com/app/billing/TaxCalculator.java
package com.app.billing;
public class TaxCalculator { public double calc(double x){ return x*0.09; } }
```

## 12) Inheritance vs Composition

* ارث‌بری وقتی «X نوعی از Y است». ترکیب وقتی «X دارای Y است».

```java
// ❌ Bad: ارث‌بری برای افزودن قابلیت (رابطه is-a واقعی نیست)
class CarBad extends EngineBad { void drive(){ start(); } }
class EngineBad { void start(){} }

// ✅ Good: Composition (تعویض‌پذیر)
interface Engine { void start(); }
class PetrolEngine implements Engine { public void start(){ System.out.println("vroom"); } }
class Car {
  private final Engine engine;
  Car(Engine e){ this.engine=e; }
  void drive(){ engine.start(); }
}
```

---

### نکات سریع تمایزی

* **1–5 = SOLID** اصول طراحی.
* **6–10 = Patterns** راه‌حل‌های تکرارشونده.
* **11 = Package** سازمان‌دهی کد.
* **12 = Inheritance vs Composition** انتخاب رابطهٔ درست.
