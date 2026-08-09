// swift-tools-version:5.1

import PackageDescription

let package = Package(
    name: "TimeLogicAPI",
    platforms: [
        .iOS(.v11),
        .macOS(.v10_13),
        .tvOS(.v11),
        .watchOS(.v4),
    ],
    products: [
        .library(
            name: "TimeLogicAPI",
            targets: ["TimeLogicAPI"]
        ),
    ],
    dependencies: [
        .package(url: "https://github.com/Flight-School/AnyCodable", .upToNextMajor(from: "0.6.1")),
    ],
    targets: [
        .target(
            name: "TimeLogicAPI",
            dependencies: ["AnyCodable"],
            path: "packages/swift/OpenAPIClient/Classes"
        ),
        .testTarget(
            name: "TimeLogicAPITests",
            dependencies: ["TimeLogicAPI"],
            path: "packages/swift/Tests/TimeLogicAPITests"
        ),
    ]
)
