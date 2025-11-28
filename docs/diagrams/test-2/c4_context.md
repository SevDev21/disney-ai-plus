# C4 Context

[Open in PlantUML](https://uml.shafie.org/uml/FOuxJWD1343xEONP9a42qco9KD0s51I8Y3foPfnTI_DPZJq9TDo16t8I9ZiHbR_FVgiTXzaJlAQH8-o-H2d0x_SFs7vlKrJwL72COyO0ekLWLizmG64BVY6a4SUKeGXbmA8JHMMBoYd2cNM28w6MJ09Ix0GeosR4G9iPHSufEpYXPxSW3yPiHJ5h2TxSSBI-E8B7eTyC_NweHiYHyfCnobgzhyP3KpNcZRAakBvyk8FkeuRkrhIbTNEjxLPtDNlXSRhtT28FZiHcdYyE5NadVptoJzLZKYTcIz5LkJy0)

_Source: [ArchAiTect Workbench project](https://docs.shafie.org/projects/test-2/)_

![C4 Context](https://uml.shafie.org/png/FOuxJWD1343xEONP9a42qco9KD0s51I8Y3foPfnTI_DPZJq9TDo16t8I9ZiHbR_FVgiTXzaJlAQH8-o-H2d0x_SFs7vlKrJwL72COyO0ekLWLizmG64BVY6a4SUKeGXbmA8JHMMBoYd2cNM28w6MJ09Ix0GeosR4G9iPHSufEpYXPxSW3yPiHJ5h2TxSSBI-E8B7eTyC_NweHiYHyfCnobgzhyP3KpNcZRAakBvyk8FkeuRkrhIbTNEjxLPtDNlXSRhtT28FZiHcdYyE5NadVptoJzLZKYTcIz5LkJy0)

```plantuml
'Simple Login System – c4_context diagram stub
'A basic login system for user authentication with features such as username/password validation.

@startuml
!include <C4/C4_Container>

title System Context

Person(user, "User")
System(system, "System", "High-level description")
Rel(user, system, "Uses")

@enduml
```

```mermaid
flowchart LR

    user[User]
    system[System\nHigh-level description]

    user -->|Uses| system
```

## Requirements

- The design shall define a person user named User, and implementation work must provision it as a distinct deployable or conceptual element.
- The design shall define a system system named System (High-level description), and implementation work must provision it as a distinct deployable or conceptual element.
- The architecture shall include a relationship where user uses system, and this connection must be implemented with appropriate protocols, security, and error handling.
