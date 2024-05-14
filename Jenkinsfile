pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                checkout scm
                sh "docker build -t testfront:test ."
            }
        }

        stage('Run') {
            steps {
                sh """
                    docker run -d --rm --name testfront testfront:test
                    docker stop testfront
                """
            }
        }
    
        stage("Deploy"){
            steps{
                echo "Deploy"
                sh """
                    cp -r ./* /srv/TicTacToe/Frontend
                    cd /srv/TicTacToe/Backend
                    docker compose build
                    docker compose up -d
                """
            }    
        }
    }
}
