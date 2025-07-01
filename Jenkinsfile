pipeline {
    agent any

    environment {
        NODE_ENV = 'test'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Install Browsers') {
            steps {
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test'
            }
        }

        stage('Archive Test Results') {
            steps {
                // Gera relatório HTML, se estiver usando playwright-html-reporter ou similar
                sh 'npx playwright show-report --output=playwright-report'

                // Arquiva relatórios
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            junit 'test-results/**/*.xml' // Se gerar relatórios JUnit para integração
        }
        failure {
            mail to: 'dev-team@exemplo.com',
                 subject: "Build falhou: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: "Verifique os testes Playwright no Jenkins."
        }
    }
}
