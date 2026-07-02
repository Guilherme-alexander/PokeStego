# PokeStego

**PokeStego** é uma biblioteca de esteganografia de texto baseada em Cadeias de Markov, especializada no universo Pokémon. Permite ocultar mensagens secretas em textos que aparentam ser descrições normais sobre Pokémon, itens, ataques e treinadores.

## Índice

- [Visão Geral](#visão_geral)
- [Características](#caracteristicas)
- [Instalação](#instalacao)
- [Guia de Uso](#guia-de-uso)
  - [Uso Básico](#uso-basico)
  - [Configuração Personalizada](#configuracao-personalizada)
  - [Interface Web](#interface-web)
- [API](#api)
  - [Construtor](#construtor)
  - [Métodos](#metodos)
- [Arquitetura](#arquitetura)
  - [Modelo N-Gram](#modelo-n-gram)
  - [Processo de Codificação](#processo-de-codificacao)
  - [Processo de Decodificação](#processo-de-decodificacao)
- [Exemplos](#exemplos)
- [Limitações](#limitacoes)
- [Referências](#referencias)
- [Licença](#licenca)

---

## Visão_Geral

PokeStego implementa um algoritmo de esteganografia que utiliza modelos de linguagem baseados em Cadeias de Markov para gerar textos que carregam informações ocultas. O sistema é treinado com um corpus de frases relacionadas ao universo Pokémon, permitindo que as mensagens codificadas sejam naturalmente disfarçadas como conversas sobre o tema.

A técnica baseia-se no trabalho de Hernan Moraldo sobre "An Approach for Text Steganography Based on Markov Chains", adaptado para o contexto Pokémon com um banco de dados extenso de mais de 900 Pokémon, itens, ataques e personagens.

## Caracteristicas

- **Banco de Dados Extenso**: Mais de 900 Pokémon de todas as gerações, além de itens, ataques e treinadores
- **Modelo N-Gram Flexível**: Suporte a diferentes ordens de n-gram (bigrama, trigrama, etc.)
- **Codificação e Decodificação**: Transforma mensagens secretas em textos aparentemente normais
- **Corpus Personalizável**: Permite adicionar ou substituir o corpus de treinamento
- **Interface Web**: Aplicação pronta para uso com design moderno e tema Pokémon
- **Estatísticas em Tempo Real**: Visualização de métricas do modelo durante a execução
- **UTF-8 Completo**: Suporte a acentos, emojis e caracteres especiais

## Instalacao

### Uso em Navegador

Inclua os arquivos no seu projeto HTML:

```html
<script src="PokeStego.js"></script>
```

### Uso em Node.js

```bash
npm install pokestego
```

```javascript
const PokeStego = require('pokestego');
```

## Guia de Uso

### Uso Básico

```javascript
// Criar instância com configurações padrão
const stego = new PokeStego();

// Codificar mensagem
const mensagem = "A senha é 1234";
const textoCodificado = stego.encode(mensagem);
console.log("Texto codificado:", textoCodificado);

// Decodificar mensagem
const textoDecodificado = stego.decode(textoCodificado);
console.log("Mensagem original:", textoDecodificado);
```

### Configuração Personalizada

```javascript
const config = {
    nGramOrder: 3,              // Ordem do modelo (2 = bigrama, 3 = trigrama)
    punctuation: ['!', '?', '.'], // Pontuações para finalizar frases
    delimiter: '§|§',            // Delimitador de sentenças
    maxBitsPerWord: 16           // Capacidade máxima por palavra
};

const stego = new PokeStego(config);

// Adicionar corpus personalizado
const novosDados = [
    "Ash Ketchum é um treinador lendário",
    "Pikachu é o parceiro mais fiel"
];
stego.addCorpusData(novosDados);
```

### Interface Web

O projeto inclui uma interface web completa com:

- Seleção de corpus por geração Pokémon
- Área para entrada de mensagem
- Botões para codificação e decodificação
- Visualização de progresso e estatísticas
- Documentação integrada

Para utilizar:

1. Abra o arquivo `index.html` em um navegador
2. Selecione um corpus de treinamento
3. Digite sua mensagem no painel "Codificar"
4. Clique em "Codificar Mensagem"
5. O texto codificado aparecerá no painel "Decodificar"
6. Para decodificar, cole o texto e clique em "Decodificar Mensagem"

## API

### Construtor

#### `new PokeStego([config])`

Cria uma nova instância do PokeStego.

**Parâmetros:**
- `config` (Object, opcional): Objeto de configuração
  - `nGramOrder` (Number): Ordem do modelo n-gram (padrão: 2)
  - `punctuation` (Array): Lista de pontuações (padrão: ['!', '!', '?', '...', '⚡', '🔥', '💧', '🌿'])
  - `delimiter` (String): Delimitador de sentenças (padrão: '§|§')
  - `maxBitsPerWord` (Number): Bits máximos por palavra (padrão: 16)
  - `minCorpusSize` (Number): Tamanho mínimo do corpus (padrão: 50)

**Retorna:** Instância do PokeStego

### Métodos

#### `encode(message)`

Codifica uma mensagem usando esteganografia.

**Parâmetros:**
- `message` (String): Mensagem a ser codificada

**Retorna:** (String) Texto codificado

**Lança:** Error se a mensagem estiver vazia ou o modelo não estiver inicializado

#### `decode(text)`

Decodifica um texto codificado.

**Parâmetros:**
- `text` (String): Texto codificado

**Retorna:** (String) Mensagem original

**Lança:** Error se o texto estiver vazio ou o modelo não estiver inicializado

#### `addCorpusData(data)`

Adiciona novos dados ao corpus de treinamento.

**Parâmetros:**
- `data` (Array|String): Dados a serem adicionados

**Retorna:** (Object) Estatísticas atualizadas do modelo

#### `getStats()`

Obtém estatísticas do modelo atual.

**Retorna:** (Object) Estatísticas contendo:
- `totalNGrams`: Número total de n-grams
- `totalWords`: Total de palavras no corpus
- `averageOutcomes`: Média de saídas por n-gram
- `corpusSize`: Tamanho total do corpus em caracteres

#### `buildModel(corpusData)`

Constrói o modelo n-gram a partir do corpus.

**Parâmetros:**
- `corpusData` (Array): Array de strings para treinamento

**Retorna:** (Map) Modelo n-gram construído

#### `initCorpus()`

Inicializa o corpus com dados Pokémon padrão.

**Retorna:** Instância do PokeStego (para encadeamento)

## Arquitetura

### Modelo N-Gram

O coração do PokeStego é um modelo de linguagem baseado em n-grams. O sistema:

1. Tokeniza o corpus em palavras
2. Constrói um mapa de n-grams para palavras seguintes
3. Calcula probabilidades para cada transição
4. Utiliza o modelo para gerar texto que segue o padrão do corpus

### Processo de Codificação

O processo de codificação segue estas etapas:

1. **Conversão para Bytes**: A mensagem é convertida para bytes usando UTF-8
2. **Criação do BitField**: Os bytes são transformados em um fluxo de bits
3. **Codificação do Tamanho**: O tamanho da mensagem (4 bytes) é codificado primeiro
4. **Codificação dos Dados**: Cada bit é codificado selecionando palavras apropriadas
5. **Geração de Texto**: As palavras são combinadas em texto com pontuação adequada

### Processo de Decodificação

O processo de decodificação é o inverso:

1. **Tokenização**: O texto é convertido em palavras
2. **Decodificação do Tamanho**: Os primeiros 4 bytes são decodificados
3. **Decodificação dos Dados**: Os bits são extraídos das palavras
4. **Reconstrução**: Os bytes são convertidos de volta para string

## Exemplos

### Exemplo 1: Codificando e Decodificando

```javascript
const stego = new PokeStego();

const original = "Mensagem secreta!";
const codificado = stego.encode(original);
const decodificado = stego.decode(codificado);

console.log("Original:", original);
console.log("Codificado:", codificado);
console.log("Decodificado:", decodificado);
// Original: Mensagem secreta!
// Codificado: Ash usou Pikachu com Thunderbolt!
// Decodificado: Mensagem secreta!
```

### Exemplo 2: Usando Corpus Personalizado

```javascript
const corpus = [
    "Mewtwo é o Pokémon mais poderoso",
    "Rayquaza vive na atmosfera",
    "Arceus é o criador dos Pokémon"
];

const stego = new PokeStego();
stego.buildModel(corpus);

const codificado = stego.encode("Senha123");
const decodificado = stego.decode(codificado);
```

### Exemplo 3: Configuração Avançada

```javascript
const stego = new PokeStego({
    nGramOrder: 3,
    punctuation: ['.', '.', '?', '!'],
    delimiter: '|||',
    maxBitsPerWord: 20
});

const mensagem = "Acesso autorizado";
const codificado = stego.encode(mensagem);
console.log("Texto gerado:", codificado);
```

## Limitações

1. **Tamanho do Corpus**: Modelos com corpus pequeno podem ter qualidade de texto inferior
2. **Velocidade**: Corpus muito grandes podem tornar a codificação lenta
3. **Memória**: Modelos com ordem alta (>4) podem consumir muita memória
4. **Detectabilidade**: Embora seja mais natural que outros métodos, a esteganografia baseada em Markov ainda pode ser detectada com análise estatística avançada

## Referências

- Moraldo, H. "An Approach for Text Steganography Based on Markov Chains" - 41 JAIIO, 2012
- Implementação original: [markovTextStego.js](https://github.com/jthuraisamy/markovTextStego.js)
- Algoritmo baseado em Cadeias de Markov para processamento de linguagem natural

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para mais detalhes.

---

## Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Autores

- Guilherme Alexander - Desenvolvedor principal

## Agradecimentos

- Hernan Moraldo pelo algoritmo original
- Jackson Thuraisamy pela implementação em JavaScript
- Comunidade Pokémon pela inspiração
