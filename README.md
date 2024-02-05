# README
Material React Table v2でオリジナルのフィルターを作成するサンプルPGです。
[material-react-table v2](https://www.material-react-table.com/)

## Structure
```
app
├── src
│   ├── App.tsx - メインコンポーネント
│   ├── providers
│   │   ├── app.tsx - プロバイダー
│   ├── routes
│   │   ├── index.tsx - ルーティング
│   ├── features
│   │   ├── table
│   │   │   ├── components
│   │   │   │   ├── UserTable.tsx - テーブルコンポーネント
│   │   │   │   ├── CustomDatePicker.tsx - 日付ピッカーコンポーネント
│   │   │   ├── filters
│   │   │   │   ├── dateFilter.ts - 日付フィルター（今回の本題）
│   │   │   ├── routes
│   │   │   │   ├── index.ts - ルーティング
│   │   │   │   ├── TableRoute.tsx - テーブルのルーティング
```

## Usage
```
git clone {this repository}
cd {this repository}/app
yarn
yarn build
yarn start
``

Use your browser to access http://localhost:3000
