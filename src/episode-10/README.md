# Chap.10 条件記述の単純化

## 目次

- 10-1 条件記述の分解
- 10-2 条件記述の統合
- 10-3 ガード節による入れ子の条件記述の置き換え
- 10-4 ポリモーフィズムによる条件記述の置き換え
- 10-5 特殊ケースの導入
- 10-6 アサーションの導入

## 【前書き】

- プログラムがなぜ便利かは、「条件付きのロジック」を実装できること が挙げられる
  - ただし、プログラムが複雑になりやすいのは、この条件記述 が 原因の一つ
    - これを理解しやすくするために、リファクタリングを行う（使うテクニックは、目次参照）

--

## 10-1 条件記述の分解

```js
// 例）冬と夏で適用レート が 異なる料金計算

if (!aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd))
  charge = quantity * plan.summerRate;
else charge = quantity * plan.summerRate + plan.regularServiceCharge;
```

↓

```js
if (summer()) charge = summerCharge();
else charge = regularCharge();
```

### 初見の感想

- summer() / summerCharge() / regularCharge() どっから出てきた？
- 元コード の 条件式の中身 どこいった？
  - この後の説明で理解できました。

### 動機

- プログラムが複雑になりやすいのは、条件分岐（複雑な） が原因の一つ
  - 条件に応じた処理をただひたすら書くと、すぐに長くなってしまう
- 大きなブロックのコードについて
  - コードを分解し、意図に沿って名付けた関数の呼び出し に置き換えることで、意図を明確にできる
  - 条件記述 及び 条件の各節 に「関数の抽出」を適用できる。

### 手順

- 条件記述 及び 条件の各節に「関数の抽出」を適用する
- **Github - case1.js 参照**

--

## 10-2 条件記述の統合

```js
// 例）障がい手当 を計算する

if (anEmployee.seniority < 2) return 0;
if (anEmployee.monthsDisabled > 12) return 0;
if (anEmployee.isPartTime) return 0;
```

↓

```js
if (isNotEligibleForDisability()) return 0;

function isNotEligibleForDisability() {
  return (
    anEmployee.seniority < 2 ||
    anEmployee.monthsDisabled > 12 ||
    anEmployee.isPartTime
  );
}
```

### 初見の感想

- いきなり出てきた isNotEligibleForDisability は、新しく作った
- 条件式が 3 つとも return 0 で結果が同じなので、条件 の方をまとめた

### 動機

- 条件判定があり、条件は異なる けど 結果が同じ 場合について
  - and（&&） や or（||） を使って、単一の結果 を返す一つの条件判定に統合できる。

### 手順

- どの条件判定にも 副作用 がないことを確認する
  - 「副作用がないこと」とは
    - 関数が外部の状態を変更（依存）することなく実行されること。
- まずは 条件判定を二つ取り出し、論理演算子（and または or） を使って結合する
- テストする
- 条件が一つになるまで、条件判定の結合 を繰り返す
- 結果として得られた条件判定に対して「関数の抽出」を検討する
- **Github - case2.js 参照**

--

## 10-3 ガード節による入れ子の条件記述の置き換え

```js
// 例）従業員への支払額 を計算するコード

function getPayAmount() {
  let result;
  if (isDeed) result = deadAmount();
  else {
    if (isSeparated) result = separatedAmount();
    else {
      if (isRetired) result = retiredAmount();
      else result = normalPayAmount();
    }
  }
  return result;
}
```

↓

```js
function getPayAmount() {
  if (isDead) return deadAmount();
  if (isSeparated) return separatedAmount();
  if (isRetired) return retiredAmount();
  return normalPayAmount();
}
```

### 動機

- 条件記述には二つのスタイルがある
  - ① then 節 と else 節 の両方が正常動作
    - then 節 と else 節 を明示して 条件を記述する
  - ② 一方が 正常動作 で もう一方 が 例外的動作
    - 条件を判定し、成立する場合 は return する
- この判定を「ガード節」と呼ぶ

### 手順

- 置換する条件 で 最も外側のもの を選んで、ガード節 に変更する
- テストする
- 上記を繰り返す
- 全てのガード節 が 同じ結果 を返す場合は、「条件記述の統合」を行う
- **Github - case3-1.js 〜 3-3.js 参照**

--

## 10-4 ポリモーフィズムによる条件記述の置き換え

```js
// 例）鳥の情報 を判定する小さなプログラム

switch (bird.type) {
  case "EuropeanSwallow":
    return "avarage";
  case "AfircanSwallow":
    return bird.numberOfCoconuts > 2 ? "tired" : "avarage";
  case "NorwegianBlueParrot":
    return bird.voltage > 100 ? "scorched" : "beautiful";
  default:
    return "unknown";
}
```

↓

```js
class EuropeanSwallow {
  get plumage() {
    return "avarage";
  }
}
class AfricanSwallow {
  get plumage() {
    return this.numberOfCoconuts > 2 ? "tired" : "avarage";
  }
}
class NorwegianBlueParrot {
  get plumage() {
    return this.voltage > 100 ? "scorched" : "beautiful";
  }
}
```

### 動機

- 複雑な条件ロジック を改善できる場合
  - ロジックに 構造 を与える
    - クラス と ポリモーフィズム を用いて、分離を明快に表現できる
- ポリモーフィズム
  - 「一つのインターフェースを持つ異なるオブジェクト を 同一の方法 で操作する」
  - 今回だと plumage という同じメソッドを共有していて、それぞれのインスタンスで このメソッドが 特定の動作を提供する

### 手順

- クラス と一緒に 適切なインスタンス を返す ファクトリ関数 を作成する
  - ファクトリ関数
    - コンストラクタ関数を呼び出す代わりに、特定の状況に依ったインスタンス を生成する関数。
    - こちらを作成することによって、プログラムの偶然性と複雑さ が軽減され、コードの再利用性と保守性が向上する。
- 呼び出し側のコード で ファクトリ関数 を使う
- 条件ロジックを持つ関数 を スーパークラス に移動する
- サブクラス を一つ選んで、オーバーライドするメソッド を作成する
- 上記を繰り返す
- スーパークラスのメソッド には デフォルトケース を残す
- **Github - case4.js 〜 4-2.js 参照**

--

## 10-5 特殊ケースの導入

```js
if (aCustomer === "unknown") customerName = "occupant";
```

↓

```js
class UnknownCustomer {
  get name() {
    return "occupant";
  }
}
```

### 動機

- よくあるケースで、データ構造が特定の値か を判定することが多く、またこの判定の処理を重複して記述していること が多い
  - 特殊ケースとして共通な振る舞いをする要素 を作成し、この判定を 簡単な呼び出し に置き換えることができる
    - 特殊ケースの処理 を要する典型的な値 が null
      - このパターン を ヌルオブジェクトパターン と呼ぶ

### 手順

- 特殊ケースの値を、特殊ケース用のクラス または データ構造 に置き換える
- 特殊ケースを判定するプロパティ を オブジェクトにして、false を返す
- 特殊ケースを判定するプロパティだけを持つ 特殊ケース用クラス を作成して、true を返す
- 特殊ケースと比較するコードに対して「関数の抽出」を行う。全てのクライアントコードで、この新しい関数を使う
- 新しく作成した 特殊ケース用クラス をコードに導入する。 特殊ケース用オブジェクトは 関数呼び出し から返すか、変換関数でオブジェクトに組み込む
- 特殊ケースと比較する関数の本体 を変更して、特殊ケースの判定用プロパティ を使う
- テストする
- 「関数群のクラスへの集約」or「関数群の変換への集約」を行なって、共通な特殊ケースの処理 を 特殊ケース用クラス に全て移動させる
- 他に、特殊ケースの判定が必要な場所は、特殊ケース比較関数の呼び出しロジック に対して「関数のインライン化」を行う
- **Github - case5.js 〜 5-.js 参照**

--

## 10-6 アサーションの導入

```js
if (this.discountRate) base = base - this.discountRate * base;
```

↓

```js
assert(this.discountRate >= 0);
if (this.discountRate) base = base - this.discountRate * base;
```

### 動機

- ほとんどの場合、コードの特定部分 は ある条件 が成り立つ場合に機能する
  - しかし、前提が明示されないことが多い
    - 前提を明示するテクニック として、アサーション を記述する方法がある
- アサーション
  - 常に真であることを前提にした条件文
  - デバッグ / コミュニケーションの用途にも有効

### 手順

- ある条件が真であることを前提にできる場合、明示のためにアサーションを追加する
- - **Github - case6.js 参照**
