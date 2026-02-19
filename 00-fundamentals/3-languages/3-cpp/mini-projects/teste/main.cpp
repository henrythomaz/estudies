#include <SFML/Graphics.hpp>
#include <vector>
#include <cmath>
#include <optional>
#include <random>

const float G = 100.0f; // Constante gravitacional

class Body {
public:
    float mass;
    float radius;

    sf::Vector3f position;
    sf::Vector3f velocity;

    sf::CircleShape shape;  // Representação gráfica

    Body(float mass, float radius, sf::Vector3f position, sf::Vector3f velocity)
        : mass(mass), radius(radius), position(position), velocity(velocity)
    {
        shape.setRadius(radius);
        shape.setOrigin(sf::Vector2f(radius, radius));  // Para centralizar o círculo
    }

    void update(float dt) {
        // Atualiza a posição e velocidade
        position += velocity * dt;
        shape.setPosition(sf::Vector2f(position.x, position.y));  // Atualiza a posição do corpo
    }

    void draw(sf::RenderWindow& window) {
        window.draw(shape);
    }
};

int main() {
    sf::RenderWindow window(sf::VideoMode(sf::Vector2u(800, 600)), "3 Body Problem");

    std::vector<Body> bodies;

    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_real_distribution<float> dist(0.f, 800.f);

    // Corpo inicial
    bodies.emplace_back(5000.0f, 10.f, sf::Vector3f(dist(gen), dist(gen), 0.f), sf::Vector3f(0.f, -30.f, 0.f));
    bodies.emplace_back(1000.0f, 10.f, sf::Vector3f(dist(gen), dist(gen), 0.f), sf::Vector3f(0.f, -30.f, 0.f));
    bodies.emplace_back(1000.0f, 10.f, sf::Vector3f(dist(gen), dist(gen), 0.f), sf::Vector3f(0.f, 30.f, 0.f));

    bodies[0].shape.setFillColor(sf::Color::Red);
    bodies[1].shape.setFillColor(sf::Color::Green);
    bodies[2].shape.setFillColor(sf::Color::Blue);

    sf::Clock clock;

    while (window.isOpen()) {
        // Tratamento de eventos
        while (std::optional event = window.pollEvent()) {
            if (event->is<sf::Event::Closed>())
                window.close();
        }

        // DeltaTime
        float deltaTime = clock.restart().asSeconds();

        std::vector<sf::Vector3f> accelerations(bodies.size());

        // Calculando as forças e as acelerações
        for (int i = 0; i < bodies.size(); i++) {
            sf::Vector3f totalForce(0.f, 0.f, 0.f); // Inicia o vetor de força total com zero

            for (int j = 0; j < bodies.size(); j++) {
                if (i == j) continue;

                // Cálculo da força gravitacional
                float dx = bodies[j].position.x - bodies[i].position.x;
                float dy = bodies[j].position.y - bodies[i].position.y;
                float dz = bodies[j].position.z - bodies[i].position.z;

                float r = sqrt(dx * dx + dy * dy + dz * dz); // Distância entre os corpos

                // Evita divisão por zero
                if (r > 0.f) {
                    float force = (G * bodies[i].mass * bodies[j].mass) / (r * r);

                    // Componentes da força
                    totalForce.x += force * (dx / r);
                    totalForce.y += force * (dy / r);
                    totalForce.z += force * (dz / r);
                }
            }
            // Calculando a aceleração
            accelerations[i] = totalForce / bodies[i].mass;
        }

        // Atualiza a velocidade e a posição dos corpos
        for (int i = 0; i < bodies.size(); i++) {
            bodies[i].velocity += accelerations[i] * deltaTime;
            bodies[i].position += bodies[i].velocity * deltaTime;

            bodies[i].update(deltaTime);
        }

        // Desenho da tela
        window.clear();
        for (auto& body : bodies) {
            body.draw(window);
        }
        window.display();
    }

    return 0;
}
