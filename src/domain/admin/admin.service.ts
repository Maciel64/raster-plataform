import { AdminCreatesUserSchema } from "@/schemas/user.schema";
import { UserRepository } from "../users/user.repository";
import { ConflictError, NotFoundError } from "@/lib/errors/http.error";
import { Crypto } from "@/lib/crypto";

export class AdminService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(data: AdminCreatesUserSchema) {
    const user = await this.userRepository.findByEmail(data.email);

    if (user) {
      throw new ConflictError("Usuário já existe");
    }

    const password = await Crypto.encrypt(
      "raster-password",
      process.env.DATABASE_CRYPTO_PASSWORD as string
    );

    return this.userRepository.create({
      id: "",
      password,
      email: data.email,
      name: data.name,
      role: data.role,
      status: data.status,
    });
  }

  async updateUser(userId: string, data: AdminCreatesUserSchema) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundError("Usuário não encontrado");
    }

    const emailAlreadyExists = await this.userRepository.findByEmail(
      data.email
    );

    if (emailAlreadyExists && emailAlreadyExists.id !== userId) {
      throw new ConflictError("Email já está em uso");
    }

    return this.userRepository.update(user.id, {
      id: user.id,
      password: user.password,
      name: data.name,
      email: data.email,
      role: data.role,
      status: data.status,
    });
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundError("Usuário não encontrado");
    }

    await this.userRepository.delete(id);
  }
}
