        /*NÚMERO ALEATÓRIO*/
        function randomize(Min, Max, Dec){
            if(!Min[1]){var TipoDeConta = 2} else{var TipoDeConta = 1}

            if(TipoDeConta == 1){
                let VetorTamanho = Min.length
                let VetorPegar = Math.round(Math.random() * (VetorTamanho - 1))
                var Randomized = Min[VetorPegar]
            } 

            if(TipoDeConta == 2){
                if(isNaN(Dec)){Dec = 0}
                var Randomized = Min + (Math.round(Math.random() * (Max - Min) * 10**Dec) / 10**Dec)

                /*ERROS*/
                if(isNaN(Min)){console.warn(`[.randomize: Error in Min=${Min}] 'Min' não é um número`); return}
                if(isNaN(Max)){console.warn(`[.randomize: Error in Max=${Max}] 'Max' não é um número`); return}
                if(Min > Max){console.warn(`[.randomize: Error in Min=${Min} & Max=${Max}] 'Min' é maior que 'Max'`); return}
                if(Min == Max){console.info(`[.randomize: Attention] 'Min' é igual a 'Max'. Isso limita a somente um resultado`)} 
                if(Dec < 0){console.warn(`[.randomize: Error in Dec=${Dec}] 'Dec' tem que er 0 ou positivo`); return}
            }

            return Randomized
        }


        /*SORTEIO COM CHANCES*/
        function chance(Valor, Chance){
            let ValorTam = Valor.length
            let ChanceTam = Chance.length
            let ChanceTotal = 0
            let AcumChance = []
            let sorteio
            let PosGanhou

            if(ValorTam == ChanceTam){
                for(i=0; i < ChanceTam; i++){
                    ChanceTotal = ChanceTotal + Chance[i]; console.log('Chance acumulada: (+ '+Chance[i]+') '+ChanceTotal)
                    AcumChance.push(ChanceTotal); console.log('    Vetor de chances: '+AcumChance)
                }

                sorteio = randomize(0, ChanceTotal, 10); console.log('Sorteio: '+sorteio)

                for(i=0; i < ChanceTam; i++){
                    let h = i-1
                    let AcumChanceMen = AcumChance[h]
                    if(!AcumChanceMen){AcumChanceMen = 0}
                    console.log('Verificação atual: ['+i+'] '+AcumChanceMen+' - '+AcumChance[i])
                    if(AcumChanceMen <= sorteio && AcumChance[i]> sorteio){
                        PosGanhou = i; console.log('    Posição que ganhou: '+i)
                    } else{console.log('    Posição fora de lugar: '+i)}
                }

                return Valor[PosGanhou]
            } else{console.warn(`[chance: Error in Chance=${Chance}] Tamanho de Chance não é o mesmo de Valor (Valor tem ${ValorTam} elemento(s) enquanto Chance tem ${ChanceTam} elemento(s))`); return}
        }
    

        /*TIRAR MÉDIA*/
        function avg(Vetor, Dec){
            if(!Vetor[0]){console.log(`[avg: Error in Vetor=${Vetor}] valor deve ser um vetor`); return}

            let ValorSoma = 0
            let ValorFinal = null
            let VetorSize = Vetor.length
            let Remover = VetorSize
            let teste = 0

            for(i = 0; i < VetorSize; i++){
                if(isNaN(Vetor[i]) || Vetor[i] == null){Remover = Remover - 1}
                else{ValorSoma = ValorSoma + Number(Vetor[i])}
            }

            if(isNaN(Dec)){ValorFinal = ValorSoma / Remover}
            else{ValorFinal = Math.round((ValorSoma / Remover) * 10**Dec) / 10**Dec}

            return ValorFinal
        }


        /*SORTEAR NÚMEROS*/
        function sortear(Tamanho, Quantidade, Repete){
            let Max = Number(Tamanho)
            let Qtdd = Quantidade
            let QtddMax = 0
            let Fila = []
            let Sorteado = []
            Repete = false
            
            if(Repete){Repete = true}
            if(isNaN(Qtdd)){QtddMax = Max} else{QtddMax = Number(args[1])}

            for(i = 0; i < Max; i++){
                Fila.push(i+1)
            }

            for(i = 0; i < QtddMax; i++){
                let Add = Fila[Math.floor(Math.random() * Fila.length)]
                Sorteado.push(Add)
                
                if(Repete){
                    let Remover = Fila.indexOf(Add)
                    Fila.splice(Remover, 1)
                }
            }

            return Sorteado
        }


        /*REMOVER VALORES DUPLICADOS*/
        function unificar(Vetor, Acompanhar){
            let log = Acompanhar
            let Fim = []
            let ver = 0
            for(a=0; a<Vetor.length; a++){
                ver = Vetor.length
                if(log){console.log('Posição A = '+a)}
                for(b=(a+1); b<Vetor.length; b++){
                    if(log){console.log('    Posição B = '+b)}
                    if(Vetor[a] === Vetor[b]){
                        if(log){console.log('        (A = '+Vetor[a]+') == (B = '+Vetor[b]+') - Removendo '+Vetor[a])}
                        ver = -1
                    }else{
                        if(log){console.log('        (A = '+Vetor[a]+') / (B = '+Vetor[b]+') - Mantendo '+Vetor[a])}
                        ver = ver - 1
                        
                    }
                }
                if(log){console.log('    ValorFinal (remover elemento se negativo): '+ver)}
                if(ver < 0){}else{
                    Fim.push(Vetor[a])}
                    if(log){console.log('    Novo vetor: ['+Fim+']')}
            }

            return Fim
        }


        //VERIFICAR QUANTA VEZES TAL VALOR REPETIU
        function repete(Valor, Local){
            let LocalTam = Local.length
            let Repete = 0

            for(i=0; i <LocalTam; i++){
                if(Local[i] == Valor){
                    Repete++
                }
            }
            return Repete
        }
        

        /*REMOVER CERTOS VALORES*/
        function filtragem(Onde, oQue, Manter, Acompanhar){
            let Resultado = []
            let OndeTam = Onde.length
            let oQueTam = oQue.length
            let verif
            let aviso = ''
            if(Acompanhar == 'impo'){Acompanhar = 'Impo'}
            /*>>*/if(Acompanhar == true || Acompanhar == 'Impo'){
                let TManter
                if(Manter == true){TManter = 'NÃO '} else{TManter = ''}
                console.log(`Removendo todos os valores de [${Onde}] que ${TManter}forem encontrados em [${oQue}]`)
            }

            for(a=0; a < OndeTam; a++){
                /*>>*/if(Acompanhar == true){console.log(`  Posição a comparar: Onde[${a}] (valor: ${Onde[a]})`)}
                verif = oQueTam

                for(b=0; b < oQueTam; b++){
                    /*>>*/if(Acompanhar == true){console.log(`      Comparando posição Onde[${a}] com: oQue[${b}] (valor de oQue[b]: ${oQue[b]})`)}
                    if(Onde[a] === oQue[b]){
                        /*>>*/if(Acompanhar == true){console.log(`          Verificação diz que ${Onde[a]} === ${oQue[b]}`)}
                        verif = -1
                        b = oQueTam+5
                    } else{
                        /*>>*/if(Acompanhar == true){console.log(`          Verificação diz que ${Onde[a]} <> ${oQue[b]}`)}
                        verif = verif
                    }
                }
                if(Manter == true){
                    if(verif < 0){
                        /*>>*/if(Acompanhar == true || Acompanhar == 'Impo'){if(Acompanhar != 'Impo'){aviso = ` por estar em ${oQue}`}; console.log(`              Mantendo ${Onde[a]}`+aviso)}
                        Resultado.push(Onde[a])
                    } else{/*>>*/if(Acompanhar == true || Acompanhar == 'Impo'){if(Acompanhar != 'Impo'){aviso = ` por não estar em ${oQue}`}; console.log(`              Removendo ${Onde[a]}`+aviso)}}
                } else{
                    if(verif >= 0){
                        /*>>*/if(Acompanhar == true || Acompanhar == 'Impo'){if(Acompanhar != 'Impo'){aviso = ` por não estar em ${oQue}`}; console.log(`              Mantendo ${Onde[a]}`+aviso)}
                        Resultado.push(Onde[a])
                    } else{/*>>*/if(Acompanhar == true || Acompanhar == 'Impo'){if(Acompanhar != 'Impo'){aviso = ` por estar em ${oQue}`}; console.log(`              Removendo ${Onde[a]}`+aviso)}}
                }
            }

            return Resultado
        }
        

        /*LIMPAR TERMINAL*/
        function limparLog(Aviso, Tamanho){
            if(isNaN(Tamanho)){Tamanho = 100}
            for(i=0; i < Tamanho; i++){console.log('')}
            if(Aviso){console.log('O Terminal foi limpo')}
            
            return
        }


        /*COMO USAR AS FUNÇÕES*/
        function HowToUse(Descrição, Significado, Exemplo){
            let Func = true
            let Desc = Descrição;   if(Descrição == undefined)  {Desc = true}
            let Sign = Significado; if(Significado == undefined){Sign = true}
            let Exem = Exemplo;     if(Exemplo == undefined)    {Desc = true}

            let MSG = ''
            let Conf = [Desc, Sign, Exem]
            if(Desc ==  true && Sign ==  true && Exem ==  true) MSG = 'estrutura'+', ' +'descrição da função'+', ' +'significado dos parâmetros'+' e '+'exemplo'
            if(Desc ==  true && Sign ==  true && Exem == false) MSG = 'estrutura'+', ' +'descrição da função'+' e '+'significado dos parâmetros'
            if(Desc ==  true && Sign == false && Exem ==  true) MSG = 'estrutura'+', ' +'descrição da função'                                   +' e '+'exemplo'
            if(Desc ==  true && Sign == false && Exem == false) MSG = 'estrutura'+' e '+'descrição da função'
            if(Desc == false && Sign ==  true && Exem ==  true) MSG = 'estrutura'+', '                             +'significado dos parâmetros'+' e '+'exemplo'
            if(Desc == false && Sign ==  true && Exem == false) MSG = 'estrutura'+', '                             +'significado dos parâmetros'
            if(Desc == false && Sign == false && Exem ==  true) MSG = 'estrutura'                                                               +' e '+'exemplo'
            if(Desc == false && Sign == false && Exem == false) MSG = 'estrutura'

            console.log('Versão atual: v1.0 de 27 jun 2021 by Zienaps\n\nCOMO USAR AS FUNÇÕES:\n')
            console.log('Mostrando '+MSG+' das funções disponíveis')
            
            if(Func == true) console.log('\nrandomize(Min, {Max}, {Dec})')
            if(Desc == true) console.log('- Peça um número aleatório entre dois extremos. Escolha se quer casas decimais ou não. Você também pode sortear elementos de um vetor.\n Estrutura:')
            if(Func == true) console.log('  Sortear um valor [randomize(Min, Max, Dec)]:')
            if(Sign == true) console.log('   > Min        [Int] = Valor mínimo a ser sorteado')
            if(Sign == true) console.log('   > Max        [Int] = Valor máximo a ser sorteado')
            if(Sign == true) console.log('   > Dec        [Int] (Opc) = Quantidade de casas decimais no resultado (Padrão: Resultado inteiro)')
            if(Exem == true) console.log('  Exemplo:')
            if(Exem == true) console.log('   randomize(5, 30.5, 2)')
            if(Exem == true) console.log('    PROCESSO: [Sorteio] 13,27787 >> [Arred. para Dec casa] 13.3')
            if(Exem == true) console.log('    O sistema irá sortear um número entre o Min e o Max e depois arredondará mantendo a quantidade de casas decimais definida em Dec')
            if(Func == true) console.log('  Sortear um elemento de um vetor [randomize(Min)]:')
            if(Sign == true) console.log('   > Min        [Array] = Adicione o vetor com os valores no qual queira ser sorteado')
            if(Exem == true) console.log('  Exemplo:')
            if(Exem == true) console.log("   randomize([2, 5, 'B', 'D', 'JOTA'])")
            if(Exem == true) console.log("    PROCESSO: [Sorteio] 3.43543 >> [Ver posição] 3 >> [Trazer posição] 'D'")
            if(Exem == true) console.log('    O sistema irá sortear um número aleatório entre 0 e o tamanho do vetor e verá qual o elemento está na posição do valor sorteado. Esse será o resultado')

            if(Func == true) console.log( '\nchance(Valor, Chance, {Acompanhar})    [NEW!]')
            if(Desc == true) console.log('- Sorteie um elemento de um vetor trabalhando em cima de chance')
            if(Sign == true) console.log('   > Valor      [Array] = Vetor onde estarão os elementos a ser sorteado')
            if(Sign == true) console.log('   > Chance     [Array] = Vetor onde etarão as chances de sorteio de cada elemento')
            if(Exem == true) console.log('  Exemplo:')
            if(Exem == true) console.log("   chance(['A', 'B', 'C', 'D', 'E'], [1, 3, 2, 5, 3], false)")
            if(Exem == true) console.log("    PROCESSO: [Sorteio] 8.946 >> [Procurar em Chance] 1+3+2+5+3 >> posição [3] >> 'D'")
            if(Exem == true) console.log('    O sistema irá sortear um valor aleatório e irá ver qual posição caiu nesse peso')

            if(Func == true) console.log('\navg(Vetor, {Dec})')
            if(Desc == true) console.log('- Tire a média dos valores que estão dentro do vetor. Valores não numéricos serão ignorados\n  Estrutura:')
            if(Sign == true) console.log('   > Vetor      [Array] = Vetor com os valores dentro')
            if(Sign == true) console.log('   > Dec        [Int] (Opc) = Quantidade de casas decimais no resultado (Padrão: floor com todos os dígitos)')
            if(Exem == true) console.log('  Exemplo:')
            if(Exem == true) console.log("   avg([1, 5, 2, 7, 'C', 3], 2)")
            if(Exem == true) console.log('    PROCESSO: [Remover não-numerais] 1,5,2,7,3 >> [Soma tudo] 18 >> [Divide pela quantidade de números] 18/5 = 3.6')
            if(Exem == true) console.log("    O sistema irá remover os elementos que não for número e tirar uma média de todos os valores restantes")

            if(Func == true) console.log('\nrepete(Valor, Local)')
            if(Desc == true) console.log('- Verifique quantas vezes tal valor apareceu em um conjunto')
            if(Sign == true) console.log('   > Valor      [Any]: Qual o valor deve ser verificado')
            if(Sign == true) console.log('   > Local      [Array]: Local onde deve ser verificado')
            if(Exem == true) console.log("  Exemplo:")
            if(Exem == true) console.log("   repete(3, [1, 5, 3, 4, 3, 5, 3, 3, 2, 1]")
            if(Exem == true) console.log("    PROCESSO: [Deixa somente o valor procurado] 3,3,3,3 >> [Verifica o tamanho] 4")
            if(Exem == true) console.log("    O sistema verifica quantos elementos tem o mesmo valor do valor procurado e trás quantos encontrou")

            if(Func == true) console.log('\nsortear(Tamanho, Quantidade, {Repete})')
            if(Desc == true) console.log('- Crie um vetor com números sorteados, repetidos ou não\n  Estrutura:')
            if(Sign == true) console.log('   > Tamanho    [Int]: Qual o valor máximo a ser sorteado (será sorteado de 1 até X)')
            if(Sign == true) console.log('   > Quantidade [Int] (Opc): Quantos números devem ser sorteados')
            if(Sign == true) console.log('   > Repete     [Bool] (Opc): Se os números sorteados podem repetir')
            if(Exem == true) console.log("  Exemplo:")
            if(Exem == true) console.log("   sortear(30, 3, false")
            if(Exem == true) console.log("   PROCESSO: [Cria um vetor de 1 a 30] 1,2,3...29,30 >> [Sorteia um elemento] 29 >> [Remove o elemento do vetor] 1,2,3...28,30 >> [Refaz o processo 'Quantidade' vezes] 13,15 >> [trás todos os sorteados] 29,13,15")
            if(Exem == true) console.log("   O sistema sorteia um número do vetor inicial e, se false, remove-o da lista. Repete o processo várias vezes e depois trás em vetor o resultado")
            
            if(Func == true) console.log('\nunificar(Vetor, {Acompanhar})')
            if(Desc == true) console.log('- Remova valores duplicados de seu vetor permanecendo somente o último elemento repetido\n  Estrutura:')
            if(Sign == true) console.log('   > Vetor      [Array] = Vetor com os elementos a serem verificados')
            if(Sign == true) console.log('   > Acompanhar [Bool] (Opc) = Se deve trazer em log o processo de verificação (Isso pode atrasar a resposta. Use somente caso queira acompanhar o processo)')
            if(Exem == true) console.log("  Exemplo:")
            if(Exem == true) console.log("   unificar([1, 5, 2, 3, 5, 4, 3, 2, 5, 1, 3], false")
            if(Exem == true) console.log("    PROCESSO: 1,5,6,2,3,5,4,3,2,5,1,3 >> [Verifica os termos e exclui se já existe] >> 6,4,2,4,1,3")
            if(Exem == true) console.log("    O sistema remove os termos que ele verificar se já existe após ele")

            if(Func == true) console.log('\nfiltragem(Onde, oQue, {Manter}, {Acompanhar})   [NEW!]')
            if(Desc == true) console.log('- Veja se os valores de um vetor estão no segundo vetor e mantenha os que não tiver, ou vice-versa')
            if(Sign == true) console.log('   > Onde       [Array]: Vetor a verificar os valores. Retornará esse vetor filtrado pelo \'oQue\'')
            if(Sign == true) console.log('   > oQue       [Array]: Vetor onde o sistema usará de base para filtrar o primeiro vetor')
            if(Sign == true) console.log('   > Manter     [Bool] (Opc): true caso queira manter somente os valores encontrados (Padrão remove valores encontrados')
            if(Sign == true) console.log('   > Acompanhar [Bool or \'Impo\'] (Opc): Se deve trazer em log o processo de verificação (Isso pode atrasar a resposta). \'Impo\' mostra somente logs importantes')
        
            if(Func == true) console.log('\nlimparLog({Aviso}, {Tamanho})')
            if(Desc == true) console.log('- Limpe o terminal\n  Estrutura:')
            if(Sign == true) console.log('   > Aviso      [Bool] (Opc): Se deve ser avisado que a limpeza foi feita após a mesma')
            if(Sign == true) console.log('   > Tamanho    [Int] (Opc): Quantas linhas devem ser adicionadas (Padrão: 100)')
            
            return
        }



module.exports = {
    randomize,
    chance,
    avg,
    repete,
    sortear,
    unificar,
    filtragem,
    limparLog
}